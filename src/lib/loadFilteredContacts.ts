import fs from 'fs/promises';
import path from 'path';

export async function loadFilteredContacts(classification: string) {
  const filePath = path.join(process.cwd(), 'public/data/contact_list/contact_list.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(raw);

  const academicStaff = data["Academic Staff"] || [];
  const researchFellows = data["Research Fellows/Adjunct Professor"] || [];

  const combined = [...academicStaff, ...researchFellows];

  return combined.filter(
    (entry: any) => entry.Classification === classification
  );
}