import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { db } from '../db/index';
import { mensajesTable } from '../db/mensajesSchema';
import { conversacionesTable } from '../db/conversacionesSchema';
import { seguimientosTable } from '../db/seguimientosSchema';
import { and, or, eq } from 'drizzle-orm';

export function initializeChatSocket(io: SocketIOServer) {
  io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado:', socket.id);

    // Autenticación del socket
    socket.on('authenticate', (token) => {
      try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, 'your-secret') as { userId: number; rol_id: number };
        console.log('Usuario autenticado:', decoded.userId);

        // Almacenar datos del usuario en el socket
        socket.data.userId = decoded.userId;
        socket.data.rolId = decoded.rol_id;

        socket.emit('authenticated', { success: true, userId: decoded.userId });
      } catch (error) {
        console.log('Error de autenticación:', error);
        socket.emit('authenticated', { success: false, error: 'Token inválido' });
        socket.disconnect();
      }
    });

    // Unirse a una conversación
    socket.on('join-conversation', async (conversationId) => {
      // Verificar que el usuario esté autenticado antes de unirse
      if (!socket.data.userId) {
        console.log('❌ Usuario no autenticado intentando unirse a conversación');
        socket.emit('error', { message: 'Debe autenticarse primero' });
        return;
      }

      try {
        // ✅ VALIDACIÓN DE AUTORIZACIÓN REQ-4.14.3
        // Parsear el conversationId para obtener los IDs de usuarios
        const [user1Id, user2Id] = conversationId.split('-').map(Number);
        const currentUserId = socket.data.userId;

        // Verificar que el usuario actual sea parte de la conversación
        if (currentUserId !== user1Id && currentUserId !== user2Id) {
          console.log(`❌ Usuario ${currentUserId} no autorizado para conversación ${conversationId}`);
          socket.emit('error', { message: 'No tienes permisos para acceder a esta conversación' });
          return;
        }

        // El otro usuario en la conversación
        const otherUserId = currentUserId === user1Id ? user2Id : user1Id;

        // Verificar seguimiento mutuo - el usuario actual sigue al otro
        const currentFollowsOther = await db.select()
          .from(seguimientosTable)
          .where(
            and(
              eq(seguimientosTable.seguidor_id, currentUserId),
              eq(seguimientosTable.seguido_usuario_id, otherUserId)
            )
          );

        // Verificar seguimiento mutuo - el otro usuario sigue al actual
        const otherFollowsCurrent = await db.select()
          .from(seguimientosTable)
          .where(
            and(
              eq(seguimientosTable.seguidor_id, otherUserId),
              eq(seguimientosTable.seguido_usuario_id, currentUserId)
            )
          );

        // Debe haber seguimiento mutuo para acceder a la conversación
        if (currentFollowsOther.length === 0 || otherFollowsCurrent.length === 0) {
          console.log(`❌ No hay seguimiento mutuo entre usuarios ${currentUserId} y ${otherUserId}`);
          socket.emit('error', { message: 'Solo puedes conversar con usuarios que sigues y que te siguen' });
          return;
        }

        // Si pasa todas las validaciones, unirse a la conversación
        const roomName = `conversation-${conversationId}`;
        socket.join(roomName);
        console.log(`✅ Usuario ${socket.id} (userId: ${currentUserId}) autorizado y unido a conversación ${conversationId}`);

        // Verificar cuántos usuarios hay en la room
        const roomClients = io.sockets.adapter.rooms.get(roomName);
        const clientCount = roomClients ? roomClients.size : 0;
        console.log(`🏠 Room ${roomName} ahora tiene ${clientCount} usuarios conectados`);

        // Confirmar al cliente que se unió exitosamente
        socket.emit('joined-conversation', { conversationId, roomName });

      } catch (error) {
        console.error('Error validating conversation access:', error);
        socket.emit('error', { message: 'Error al validar permisos de conversación' });
      }
    });

    // Salir de una conversación
    socket.on('leave-conversation', (conversationId) => {
      socket.leave(`conversation-${conversationId}`);
      console.log(`Usuario ${socket.id} salió de la conversación ${conversationId}`);
    });

    // Enviar mensaje
    socket.on('send-message', async (data) => {
      const { conversationId, message, timestamp } = data;
      const userId = socket.data.userId;

      // Verificar que el usuario esté autenticado
      if (!userId) {
        socket.emit('error', { message: 'Usuario no autenticado' });
        return;
      }

      console.log('Mensaje recibido de usuario', userId, ':', data);

      try {
        // Parsear el conversationId para obtener los IDs de usuarios
        const [user1Id, user2Id] = conversationId.split('-').map(Number);

        // Verificar que el usuario que envía sea parte de la conversación
        if (userId !== user1Id && userId !== user2Id) {
          socket.emit('error', { message: 'No autorizado para esta conversación' });
          return;
        }

        // Buscar o crear la conversación en la base de datos
        let conversation = await db.select()
          .from(conversacionesTable)
          .where(
            or(
              and(
                eq(conversacionesTable.usuario_1_id, user1Id),
                eq(conversacionesTable.usuario_2_id, user2Id)
              ),
              and(
                eq(conversacionesTable.usuario_1_id, user2Id),
                eq(conversacionesTable.usuario_2_id, user1Id)
              )
            )
          );

        // Si no existe la conversación, crearla
        let conversacionDbId;
        if (conversation.length === 0) {
          try {
            // Crear nueva conversación
            const newConversation = await db.insert(conversacionesTable).values({
              usuario_1_id: Math.min(user1Id, user2Id),
              usuario_2_id: Math.max(user1Id, user2Id)
            }).returning();
            conversacionDbId = newConversation[0].id;
          } catch (error) {
            // Si hay error por duplicado, buscar la conversación existente
            console.log('Error al crear conversación, buscando existente:', error);
            const existingConversation = await db.select().from(conversacionesTable).where(
              or(
                and(
                  eq(conversacionesTable.usuario_1_id, Math.min(user1Id, user2Id)),
                  eq(conversacionesTable.usuario_2_id, Math.max(user1Id, user2Id))
                )
              )
            );
            if (existingConversation.length > 0) {
              conversacionDbId = existingConversation[0].id;
            } else {
              throw error; // Re-lanzar si no es un error de duplicado
            }
          }
        } else {
          conversacionDbId = conversation[0].id;
        }

        // Guardar el mensaje usando la API REST existente (crear mensaje directamente en DB)
        const savedMessage = await db.insert(mensajesTable).values({
          conversacion_id: conversacionDbId,
          emisor_id: userId,
          contenido: message,
          leido: false
        }).returning();

        // Crear el objeto del mensaje para Socket.IO
        const messageData = {
          id: savedMessage[0].id.toString(),
          conversationId,
          message,
          userId,
          timestamp: savedMessage[0].enviado_en?.toISOString() || new Date().toISOString()
        };

        const roomName = `conversation-${conversationId}`;

        // Verificar cuántos usuarios hay en la room antes de enviar
        const roomClients = io.sockets.adapter.rooms.get(roomName);
        const clientCount = roomClients ? roomClients.size : 0;
        console.log(`📨 Enviando mensaje a room ${roomName} con ${clientCount} usuarios conectados`);
        console.log(`📨 Datos del mensaje:`, messageData);

        // Enviar el mensaje a todos los usuarios en la conversación (incluido el remitente)
        io.to(roomName).emit('new-message', messageData);

        console.log(`✅ Mensaje enviado a room ${roomName}`);

      } catch (error) {
        console.error('Error al guardar mensaje:', error);
        socket.emit('error', { message: 'Error al enviar mensaje' });
      }
    });

    // Desconexión del usuario
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });
}