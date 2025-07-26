// src/routes/validation-documents/validationDocumentsController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { validationDocumentsTable } from '../../db/validationDocumentsSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /validation-documents:
 *   post:
 *     summary: Crear un nuevo documento de validación
 *     tags: [validationDocuments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - validation_id
 *               - document_name
 *             properties:
 *               validation_id:
 *                 type: integer
 *               document_name:
 *                 type: string
 *               document_url:
 *                 type: string
 *               is_submitted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Documento de validación creado exitosamente
 *       500:
 *         description: Error al crear el documento de validación
 */
export async function createValidationDocument(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(validationDocumentsTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createValidationDocument:', e);
    res.status(500).json({ error: 'Error al crear el documento de validación' });
  }
}

/**
 * @swagger
 * /validation-documents:
 *   get:
 *     summary: Obtener todos los documentos de validación
 *     tags: [validationDocuments]
 *     responses:
 *       200:
 *         description: Lista de documentos de validación
 *       500:
 *         description: Error al obtener los documentos de validación
 */
export async function listValidationDocuments(req: Request, res: Response) {
  try {
    const records = await db.select().from(validationDocumentsTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los documentos de validación' });
  }
}

/**
 * @swagger
 * /validation-documents/{id}:
 *   get:
 *     summary: Obtener un documento de validación por ID
 *     tags: [validationDocuments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento de validación
 *     responses:
 *       200:
 *         description: Documento de validación encontrado
 *       404:
 *         description: Documento de validación no encontrado
 *       500:
 *         description: Error al obtener el documento de validación
 */
export async function getValidationDocument(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(validationDocumentsTable).where(eq(validationDocumentsTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Documento de validación no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el documento de validación' });
  }
}

/**
 * @swagger
 * /validation-documents/{id}:
 *   put:
 *     summary: Actualizar un documento de validación por ID
 *     tags: [validationDocuments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento de validación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validation_id:
 *                 type: integer
 *               document_name:
 *                 type: string
 *               document_url:
 *                 type: string
 *               is_submitted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Documento de validación actualizado correctamente
 *       404:
 *         description: Documento de validación no encontrado
 *       500:
 *         description: Error al actualizar el documento de validación
 */
export async function updateValidationDocument(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(validationDocumentsTable).set(data).where(eq(validationDocumentsTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Documento de validación no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el documento de validación' });
  }
}

/**
 * @swagger
 * /validation-documents/{id}:
 *   delete:
 *     summary: Eliminar un documento de validación por ID
 *     tags: [validationDocuments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento de validación a eliminar
 *     responses:
 *       200:
 *         description: Documento de validación eliminado correctamente
 *       404:
 *         description: Documento de validación no encontrado
 *       500:
 *         description: Error al eliminar el documento de validación
 */
export async function deleteValidationDocument(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(validationDocumentsTable).where(eq(validationDocumentsTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Documento de validación no encontrado' });
    }
    res.status(200).json({ message: 'Documento de validación eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el documento de validación' });
  }
}
