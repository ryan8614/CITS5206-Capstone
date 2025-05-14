import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cellData, layoutData, sheetName } = body;

    if (!cellData || !layoutData || !sheetName) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

   ;
    const baseDir = path.join(process.cwd(), 'public', 'data', 'maps');
    const cellsDir = path.join(baseDir, 'cells');
    const layoutsDir = path.join(baseDir, 'layouts');

    // Make sure the directories exist
    await mkdir(cellsDir, { recursive: true });
    await mkdir(layoutsDir, { recursive: true });

    await writeFile(
      path.join(cellsDir, `${sheetName}_cells.json`),
      JSON.stringify(cellData, null, 2)
    );

    await writeFile(
      path.join(layoutsDir, `${sheetName}_layout.json`),
      JSON.stringify(layoutData, null, 2)
    );

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}