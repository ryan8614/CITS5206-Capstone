// src/lib/parseExcel.ts
import * as XLSX from 'xlsx';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function parseExcelAndSave(file: File, outputDir: string): Promise<string[]> {
    if (!file) {
      throw new Error('No file provided.');
    }
  
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const workbook = XLSX.read(buffer, { type: 'buffer' });
  
    const savedFiles: string[] = [];
  
    // Loop through each sheet in the workbook and save it as a JSON file.
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  
      const filePath = path.join(outputDir, `${sheetName}.json`);
  
      await writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  
      savedFiles.push(filePath);
    }
  
    return savedFiles;
  }