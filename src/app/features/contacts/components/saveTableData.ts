import Handsontable from 'handsontable';
import { StaffEntry, ContactData } from './types';  

export function groupBySource(data: StaffEntry[]): ContactData {
    const academic: Omit<StaffEntry, 'source'>[] = [];
    const research: Omit<StaffEntry, 'source'>[] = [];

    for (const entry of data) {
        const cleanEntry = { ...entry };
        delete (cleanEntry as any).source;

        if (entry.source === 'Academic') {
        academic.push(cleanEntry);
        } else if (entry.source === 'Research') {
        research.push(cleanEntry);
        }
    }
    
    return {
        "Academic Staff": academic,
        "Research Fellows/Adjunct Professor": research,
    };
}

export async function saveTableData(
    hotRef: React.RefObject<any>,
    // data: StaffEntry[],
    classification: string
    ): Promise<number> {
    const hotInstance = hotRef.current?.hotInstance as Handsontable | undefined;
    if (!hotInstance) return 400;

    const updatedData = hotInstance.getData();
    const headers = ['Full Name', 'Position', 'Ext No', 'Room', 'source'];

    const result = updatedData.map((row: any[]) => {
      const updated = headers.reduce((obj, key, i) => {
        obj[key] = row[i];
        return obj;
      }, {} as Record<string, any>);
    
      if (!updated['Full Name'] || !updated['Position'] || !updated['Ext No'] || !updated['Room']) {
        return null; // Skip incomplete rows
      }
    
      return {
        Classification: classification,
        'Full Name': updated['Full Name'],
        Position: updated['Position'],
        'Ext No': updated['Ext No'],
        Room: updated['Room'],
        source: updated['source'] ?? 'Academic',
      } as StaffEntry;
    }).filter((entry): entry is StaffEntry => entry !== null);

    const grouped = groupBySource(result);

    try {
        const res = await fetch('/api/save-contact-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grouped),
        });
        return res.status;
        } catch (err) {
            console.error('Error saving data:', err);
            return 500;
        }
}


