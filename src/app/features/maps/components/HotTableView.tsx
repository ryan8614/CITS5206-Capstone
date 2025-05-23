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
  bgColor?: string; 
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

function colorRenderer(
  instance: Handsontable.Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: any,
  value: any,
  cellProperties: Handsontable.CellProperties
) {
  Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);

  if ((cellProperties as any).bgColor) {
    td.style.backgroundColor = (cellProperties as any).bgColor;
  }
}

const HotTableView: React.FC<Props> = ({ cellData, layoutData }) => {
  const [data, setData] = useState<string[][]>([]);
  const [mergeCells, setMergeCells] = useState<Handsontable.GridSettings["mergeCells"]>();
  const [cellMeta, setCellMeta] = useState<Record<string, any>>({}); 

  useEffect(() => {
    if (!cellData || !layoutData) return;

    const maxRow = Math.max(...cellData.map(c => c.rowEnd));
    const maxCol = Math.max(...cellData.map(c => c.colEnd));

    const tableData = Array.from({ length: maxRow }, () => Array(maxCol).fill(""));
    const merges: NonNullable<Handsontable.GridSettings["mergeCells"]> = [];
    const meta: Record<string, any> = {};

    for (const cell of cellData) {
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
        renderer: colorRenderer, 
        comment: cell.comment ? { value: cell.comment } : undefined,
        bgColor: cell.bgColor, 
      };
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
      height="auto"
      width="auto"
      rowHeights={layoutData?.row_heights ? convertRowHeights(layoutData.row_heights) : []}
      colWidths={layoutData?.column_widths ? convertColWidths(layoutData.column_widths) : []}
      cells={(row, col) => cellMeta[`${row},${col}`] || {}}
      renderAllRows={false}
      viewportRowRenderingOffset={30}
      viewportColumnRenderingOffset={10}
    />
  );
};

export default HotTableView;