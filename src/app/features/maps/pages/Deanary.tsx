'use client'

import React from'react';
import HotTableView from "@/app/features/maps/components/HotTableView";
import cellDataJson from "@/app/features/maps/data/Deanery_LVL_2_cells.json";
import layoutDataJson from "@/app/features/maps/data/Deanery_LVL_2_layout.json";
import type { CellMeta, LayoutMeta } from "@/app/features/maps/components/HotTableView";

const cellData = cellDataJson as CellMeta[];
const layoutData = layoutDataJson as LayoutMeta;

export default function Deanary() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Deanery-LVL 2</h2>
    
      <HotTableView
        cellData={cellData}
        layoutData={layoutData}
      />
    </div>
  );
}