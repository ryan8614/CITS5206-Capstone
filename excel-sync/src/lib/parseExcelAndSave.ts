// src/lib/parseExcel.ts
import * as XLSX from 'xlsx';
import { writeFile } from 'fs/promises';
import path from 'path';

// export async function parseExcelAndSave(file: File, outputDir: string): Promise<string[]> {
//     if (!file) {
//       throw new Error('No file provided.');
//     }
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const workbook = XLSX.read(buffer, { type: 'buffer' });
  
//     const savedFiles: string[] = [];
  
//     // Loop through each sheet in the workbook and save it as a JSON file.
//     // for (const sheetName of workbook.SheetNames) {
//     //   const worksheet = workbook.Sheets[sheetName];
//     //   const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  
//     //   const filePath = path.join(outputDir, `${sheetName}.json`);
  
//     //   await writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  
//     //   savedFiles.push(filePath);
//     // }
  
//     return savedFiles;
//   }

export async function parseExcelAndSave(file: File, outputDir: string): Promise<string> {
  if (!file) {
    throw new Error('No file provided.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const workbook = XLSX.read(buffer, { type: 'buffer' });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error('No worksheet found in the uploaded Excel file.');
  }

  // 1. 用 sheet_to_html 得到原生表格 HTML
  const rawTableHtml = XLSX.utils.sheet_to_html(worksheet);

  // 2. 包一层完整 HTML 结构
  const fullHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${sheetName} - Excel Preview</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f2f2f2; }
  </style>
</head>
<body>
  ${rawTableHtml}
</body>
</html>
`;

  // 3. 保存文件
  const htmlFileName = `${sheetName}.html`;
  const htmlFilePath = path.join(outputDir, htmlFileName);

  await writeFile(htmlFilePath, fullHtmlContent, 'utf-8');

  return htmlFilePath;
}