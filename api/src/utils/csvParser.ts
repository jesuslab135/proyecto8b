import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export async function parseCSV(filePath: string): Promise<any[]> {
  const records: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => records.push(row))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err));
  });
}
