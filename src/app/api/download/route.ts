// app/api/download/route.ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';

/**
 * @function GET
 * @description Handles the download of Excel data by reading a local JSON file,
 * converting it to an Excel workbook, and returning it as a downloadable file.
 * If the file does not exist or an error occurs during processing, an appropriate
 * error response is returned.
 * 
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<Response>} A promise that resolves to a response object
 * containing the Excel file or an error message.
 */
export async function GET(req: NextRequest) {
    try {
        const dataPath = path.join(
            process.cwd(),
            'public',
            'data',
            'contact_list',
            'contact_list.json'
        );

        // If so files been found, reporting error
        if (!fs.existsSync(dataPath)) {
            return new Response(JSON.stringify({ message: 'No data available to download.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData = JSON.parse(rawData)

    // Combine all staff entries into one array
    const allEntries = Object.values(jsonData).flat() as {
        Classification: string;
        [key: string]: any;
    }[];

    // Group by Classification
    const groupedByClassification: Record<string, any[]> = {};

    allEntries.forEach((entry) => {
        const { Classification, ...rest } = entry;
        if (!Classification) return;

        if (!groupedByClassification[Classification]) {
            groupedByClassification[Classification] = [];
        }

        groupedByClassification[Classification].push(rest);
    });

    // Create Excel workbook
    const workbook = XLSX.utils.book_new();

    for (const [classification, rows] of Object.entries(groupedByClassification)) {
        const sheetName = classification.slice(0, 5).replace(/[^a-zA-Z0-9]/g, '') || 'Sheet';
        const worksheet = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }


    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="contact_list.xlsx"',
        },
    });
} catch (error) {
    console.error('Download error:', error);
    return new Response(
        JSON.stringify({ message: 'Internal server error', error: String(error) }),
        {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
}
