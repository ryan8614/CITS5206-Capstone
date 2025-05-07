// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'; // Import necessary Next.js modules for handling requests and responses
import path from 'path'; // Import the path module for working with file paths
import { parseExcelAndSave } from '@/lib/parseExcelAndSave'; // Import the function to parse and save Excel data

/**
 * @function POST
 * @description Handles the upload of an Excel file, validates it, and saves its data.
 * @param {NextRequest} req - The Next.js request object containing the uploaded file.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js response object.
 *  The response indicates whether the upload was successful or if an error occurred.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData(); // Extract form data from the request
    const file = formData.get('file') as File; // Get the file from the form data

    if (!file) {
      // If no file was uploaded, return a 400 error
      return new NextResponse(JSON.stringify({ message: 'No file uploaded.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileName = file.name; // Extract the file name
    const fileType = file.type; // Extract the file type

    const isExcel =
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'; // Check if the file is an Excel file based on its MIME type

    if (!isExcel) {
      // If the file is not an Excel file, return a 400 error
      return new NextResponse(JSON.stringify({ message: `${fileName} is not a valid Excel file.` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ✅ Upload successful, return 200 status code and save file to output directory
    const outputDir = path.join(process.cwd(), 'src', 'data'); // Define the output directory
    const savedFiles = await parseExcelAndSave(file, outputDir); // Parse the Excel file and save the data
    console.log(`Saved files: ${savedFiles}`); // Log the saved files
    return new NextResponse(JSON.stringify({ success: true, message: `${fileName} uploaded successfully.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // If an error occurred, return a 500 error
    return new NextResponse(JSON.stringify({ message: 'An error occurred (network/server error).' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
