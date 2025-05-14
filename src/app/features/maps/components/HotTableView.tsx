// components/HotTableView.tsx
"use client";

import React, { useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { convertRowHeights, convertColWidths } from "@/app/features/maps/components/convertRowHeights";

export interface CellMeta {
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
  content: string;
  border: {
    left?: string | null;
    right?: string | null;
    top?: string | null;
    bottom?: string | null;
  };
  comment?: string | null;
}

export interface LayoutMeta {
  row_heights: Record<string, number>;
  column_widths: Record<string, number>;
}

interface Props {
  cellData: CellMeta[];
  layoutData: LayoutMeta;
  onUpdate?: (cells: CellMeta[], layout: LayoutMeta) => void;
}

const HotTableView: React.FC<Props> = ({ cellData, layoutData }) => {
  const [data, setData] = useState<string[][]>([]);
  const [mergeCells, setMergeCells] = useState<Handsontable.GridSettings["mergeCells"]>();
  const [cellMeta, setCellMeta] = useState<Record<string, Handsontable.CellProperties>>({});

  useEffect(() => {
    const cells = cellData;
    const layout = layoutData;

    const maxRow = Math.max(...cells.map(c => c.rowEnd));
    const maxCol = Math.max(...cells.map(c => c.colEnd));

    const tableData = Array.from({ length: maxRow }, () => Array(maxCol).fill(""));
    const merges: NonNullable<Handsontable.GridSettings["mergeCells"]> = [];
    const meta: Record<string, Handsontable.CellProperties> = {};

    for (const cell of cells) {
      const r = cell.rowStart - 1;
      const c = cell.colStart - 1;
      tableData[r][c] = cell.content || "";

      if (cell.rowEnd > cell.rowStart || cell.colEnd > cell.colStart) {
        merges.push({
          row: r,
          col: c,
          rowspan: cell.rowEnd - cell.rowStart + 1,
          colspan: cell.colEnd - cell.colStart + 1,
        });
      }

      meta[`${r},${c}`] = {
        className: "htMiddle htCenter",
        renderer: "text",
        comment: cell.comment ? { value: cell.comment } : undefined,
      } as Handsontable.CellProperties;
    }

    setData(tableData);
    setMergeCells(merges);
    setCellMeta(meta);
  }, [cellData, layoutData]);

  return (
    <HotTable
      data={data}
      colHeaders={false}
      rowHeaders={false}
      licenseKey="non-commercial-and-evaluation"
      mergeCells={mergeCells || []}
      comments={true}
      height="100%"
      width="100%"
      rowHeights={layoutData ? convertRowHeights(layoutData.row_heights) : undefined}
      colWidths={layoutData ? convertColWidths(layoutData.column_widths) : undefined}
      cells={(row, col) => cellMeta[`${row},${col}`] || {}}
    />
  );
};

export default HotTableView;
