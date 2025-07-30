// src/routes/bloques/bloquesController.ts
import { Request, Response, NextFunction } from 'express';
import { db } from '../../db';
import { bloquesTable } from '../../db/bloquesSchema';
import { eq, or } from 'drizzle-orm';
import { versionesBloquesTable } from '../../db/versionesBloquesSchema';
import { relacionesBloquesTable } from '../../db/relacionesBloquesSchema';

const getUserId = (req: Request) => req.userId;

// 1) Crear bloque
export async function createBloque(req: Request, res: Response, next: NextFunction) {
  try {
    const pageId = Number(req.params.pageId);
    const data = req.cleanBody;
    data.pagina_id = pageId;
    data.creado_por = getUserId(req);

    const [bloque] = await db.insert(bloquesTable).values(data).returning();
    res.status(201).json(bloque);
  } catch (err) {
    next(err);
  }
}

// 2) Listar por página
export async function listBloquesByPage(req: Request, res: Response, next: NextFunction) {
  try {
    const pageId = Number(req.params.pageId);
    const bloques = await db
      .select()
      .from(bloquesTable)
      .where(eq(bloquesTable.pagina_id, pageId))
      .orderBy(bloquesTable.orden);

    res.json(bloques);
  } catch (err) {
    next(err);
  }
}

// 3) Actualizar bloque
export async function updateBloque(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const [updated] = await db
      .update(bloquesTable)
      .set(req.cleanBody)
      .where(eq(bloquesTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'No existe bloque' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// 4) Eliminar bloque
export async function deleteBloque(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    // eliminar versiones asociadas
    await db
      .delete(versionesBloquesTable)
      .where(eq(versionesBloquesTable.bloque_id, id));

    // eliminar relaciones asociadas (donde el bloque es padre O hijo)
    await db
      .delete(relacionesBloquesTable)
      .where(
        or(
          eq(relacionesBloquesTable.bloque_padre_id, id),
          eq(relacionesBloquesTable.bloque_hijo_id, id)
        )
      );

    // eliminar el bloque
    await db
      .delete(bloquesTable)
      .where(eq(bloquesTable.id, id));

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
