import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';

// Controlador para registrar usuarios desde un archivo CSV
export const registrarUsuariosDesdeCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
    }

    const results: any[] = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Aquí deberías procesar los datos y registrar los usuarios en la base de datos
        // Por ejemplo:
        // await Usuario.bulkCreate(results);
        // El siguiente es solo un ejemplo de respuesta
        res.status(200).json({ mensaje: 'Usuarios registrados correctamente', datos: results });
        // Elimina el archivo después de procesar
        fs.unlinkSync(filePath);
      });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el archivo CSV', detalle: error });
  }
};
