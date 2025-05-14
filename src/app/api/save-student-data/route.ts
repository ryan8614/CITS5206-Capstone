import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Person = {
  Name: string;
  "End Date": string | null;
  Comment: string | null;
  "Pod No": string | null;
  Type: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const { fieldName, entries }: { fieldName: string; entries: Person[] } = await req.json();

    if (!fieldName || !Array.isArray(entries)) {
      return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/data/maps/students.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'students.json not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(fileContent);

    json[fieldName] = entries;

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');

    return NextResponse.json({ message: `successfully saved ${fieldName} data` }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving student data:', error);
    return NextResponse.json({ message: 'saving failed', error: error.message }, { status: 500 });
  }
}