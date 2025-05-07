'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const ExcelEditor: React.FC = () => {
  const [data, setData] = useState<any[][]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet['!ref']!); // 解析范围，比如 A1:D10
    const output: any[][] = [];

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const row: any[] = [];
      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum }); // 转成A1,B2...
        const cell = worksheet[cellAddress];
        row.push(cell ? cell.v : null); // cell.v是单元格的值，空的就填null
      }
      output.push(row);
    }

    setData(output);
  };

  return (
    <div className="p-6">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div className="mt-6">
        <HotTable
          data={data}
          colHeaders={true}
          rowHeaders={true}
          width="100%"
          height="600px"
          licenseKey="non-commercial-and-evaluation"
          afterChange={(changes) => {
            console.log('Changed data:', changes);
          }}
        />
      </div>
    </div>
  );
};

export default ExcelEditor;