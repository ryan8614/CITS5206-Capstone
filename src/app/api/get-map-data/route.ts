import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { loadFilteredStudents } from '@/lib/loadFilteredStudents';
import { loadFilteredContacts } from '@/lib/loadFilteredContacts';

interface CellMeta {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  content: string;
  bgColor?: string;
  [key: string]: any;
}

interface ContactEntry {
  "Full Name": string;
  Position?: string;
  Room?: string | number;
  "Ext No"?: string | number;
}

interface StudentEntry {
  Name: string;
  "End Date": string | null;
  Comment: string | null;
  "Pod No": string;
  Type: string | null;
}

const studentColors: Record<string, string> = {
  "PhDs": "#FFFACD",
  "New PhD in 2025": "#E0FFFF",
  "Mphil": "#F0E68C",
  "Visiting Student": "#FFE4E1",
  "Visitors": "#D3D3D3",
  "Casual Staff": "#F5F5DC",
};

const mapToStudentKey: Record<string, string> = {
  'accounting_finance': 'AccFin',
  'economics': 'Economics',
  'marketing': 'Marketing',
  'mgmt_&_orgst': 'Mgmt & Orgs'
};

const mapToContactKey: Record<string, string> = {
  'accounting_finance': 'Accounting & Finance',
  'economics': 'Economics',
  'marketing': 'Marketing',
  'mgmt_&_orgs': 'Mgmt & Orgs',
  'deanery_lvl_2': 'Deans Office'
};

function getStudentBgColor(
  students: StudentEntry[],
  room: string
): string | undefined {
  const student = students.find(stu => String(stu["Pod No"]).trim() === room);
  if (student && student.Type && studentColors[student.Type]) {
    return studentColors[student.Type];
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // ✅ 正确：只读一次
    const mapName = body.mapName;

    if (!mapName) {
      return NextResponse.json({ error: 'Missing mapName' }, { status: 400 });
    }

    const basePath = path.join(process.cwd(), 'public/data/maps');
    const cellsPath = path.join(basePath, 'cells', `${mapName}_cells.json`);
    const layoutPath = path.join(basePath, 'layouts', `${mapName}_layout.json`);

    const [cellRaw, layoutRaw] = await Promise.all([
      fs.readFile(cellsPath, 'utf-8'),
      fs.readFile(layoutPath, 'utf-8'),
    ]);

    const layoutData = JSON.parse(layoutRaw);
    const cells: CellMeta[] = JSON.parse(cellRaw);

    const studentKey = mapToStudentKey[mapName];
    const contactKey = mapToContactKey[mapName];

    let students: StudentEntry[] = [];
    let contacts: ContactEntry[] = [];

    if (studentKey) {
      students = await loadFilteredStudents(studentKey);
    }

    if (contactKey) {
      contacts = await loadFilteredContacts(contactKey);
    }

    if (students.length === 0 && contacts.length === 0) {
      console.warn(`[info] No matching students or contacts found for ${mapName}. Returning original.`);
      return NextResponse.json({ cells, layout: layoutData });
    }

    const roomMap: Record<string, string[]> = {};
    const commentMap: Record<string, string> = {};

    // 学生填充
    students.forEach((stu: StudentEntry) => {
      const room = String(stu["Pod No"]).trim();
      const name = stu.Name;
      const typeText = stu.Type ? ` (${stu.Type})` : '';
      const summary = `${name}${typeText}`;
      if (!roomMap[room]) roomMap[room] = [];
      roomMap[room].push(summary);
      if (stu.Comment) commentMap[room] = stu.Comment;
    });

    // 教职工填充
    contacts.forEach((person: ContactEntry) => {
      const room = String(person.Room ?? '').trim();
      if (!room) return;

      const summary = `${person["Full Name"]}${person.Position ? `\n${person.Position}` : ''}${person["Ext No"] ? `\nExt: ${person["Ext No"]}` : ''}`;
      if (!roomMap[room]) roomMap[room] = [];
      roomMap[room].push(summary);
    });

    // 合并填入 cell
    const updatedCells = cells.map((cell) => {
      const room = String(cell.room ?? '').trim();
      const people = roomMap[room];
      const comment = commentMap[room];

      if (people && people.length > 0) {
        return {
          ...cell,
          content: people.join('\n\n'),
          comment: comment ?? cell.comment ?? null,
          bgColor: cell.bgColor || getStudentBgColor(students, room),
        };
      }

      return cell;
    });

    return NextResponse.json({
      cells: updatedCells,
      layout: layoutData,
    });

  } catch (error: any) {
    console.error('[populate error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}