// app/api/upload/route.ts
import { NextRequest } from 'next/server';
import path from 'path';
import { parseExcelAndSave } from '@/lib/parseExcelAndSave';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file uploaded.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileName = file.name;
    const fileType = file.type;

    const isExcel =
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel';

    if (!isExcel) {
      return new Response(JSON.stringify({ message: `${fileName} is not a valid Excel file.` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ✅ Upload successful, return 200 status code and save file to output directory
    const outputDir = path.join(process.cwd(), 'src', 'data');
    const savedFiles = await parseExcelAndSave(file, outputDir);
    console.log(`Saved files: ${savedFiles}`);
    return new Response(JSON.stringify({ success: true, message: `${fileName} uploaded successfully.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred (network/server error).' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}