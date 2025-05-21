import Handsontable from 'handsontable';

export async function saveStudentsData(
  hotRef: React.RefObject<any>,
  fieldName: string 
): Promise<number> {
  const hotInstance = hotRef.current?.hotInstance as Handsontable | undefined;
  if (!hotInstance) return 400;

  const headers = hotInstance.getColHeader() as string[];
  const rawData = hotInstance.getData();

  const parsedData = rawData.map((row: any[]) => {
    const entry = headers.reduce((acc, key, index) => {
      acc[key] = row[index];
      return acc;
    }, {} as Record<string, any>);

    // Remove any empty fields
    return {
      Name: entry["Name"] ?? "",
      "End Date": entry["End Date"] ?? null,
      Comment: entry["Comment"] ?? null,
      "Pod No": entry["Pod No"] ?? null,
      "Ext No": entry["Ext No"] ?? null,
      Type: entry["Type"] ?? null,
    };
  });

  try {
    const res = await fetch('/api/save-student-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fieldName,
        entries: parsedData
      }),
    });
    return res.status;
  } catch (err) {
    console.error('Error saving student data', err);
    return 500;
  }
}