// src/app/api/mensajes-api.ts
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const MENSAJES_ENDPOINT = `${API_URL}/api/mensajes`;

export async function fetchMensajes() {
  const token = localStorage.getItem('token');
  const res = await fetch(MENSAJES_ENDPOINT, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener mensajes');
  return data;
}

export async function getMensajeById(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al obtener mensaje');
  return data;
}

export async function createMensaje(input: {
  conversacion_id: number;
  emisor_id: number;
  contenido: string;
  enviado_en?: Date;
  leido?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(MENSAJES_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al crear mensaje');
  return data;
}

export async function updateMensaje(id: number, input: {
  contenido?: string;
  leido?: boolean;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al actualizar mensaje');
  return data;
}

export async function deleteMensaje(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${MENSAJES_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token!,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al eliminar mensaje');
  return data;
}
