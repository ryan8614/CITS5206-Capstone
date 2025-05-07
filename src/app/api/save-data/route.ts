import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      "Academic Staff": newAcademic,
      "Research Fellows/Adjunct Professor": newResearch
    } = body;

    if (!newAcademic || !newResearch) {
      return NextResponse.json({ status: 'error', message: 'Missing data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src/app/features/contacts/data/contact_list_1.json');
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const classification = newAcademic[0]?.Classification || newResearch[0]?.Classification;
    if (!classification) {
      return NextResponse.json({ status: 'error', message: 'Missing classification' }, { status: 400 });
    }

    // filter out existing entries with the same classification
    const updatedAcademic = existingData["Academic Staff"].filter(
      (entry: any) => entry.Classification !== classification
    );
    const updatedResearch = existingData["Research Fellows/Adjunct Professor"].filter(
      (entry: any) => entry.Classification !== classification
    );

    // merge new entries with existing data
    const merged = {
      "Academic Staff": [...updatedAcademic, ...newAcademic],
      "Research Fellows/Adjunct Professor": [...updatedResearch, ...newResearch],
    };

    // write updated data to file
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error saving data:', err);
    return NextResponse.json({ status: 'error', message: 'Failed to save data' }, { status: 500 });
  }
}