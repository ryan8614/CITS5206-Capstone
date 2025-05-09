'use client';

import React from'react';
import HotTableView from "@/app/features/maps/components/HotTableView";
import cellDataJson from "@/app/features/maps/data/Mgmt_&_Orgs_cells.json";
import layoutDataJson from "@/app/features/maps/data/Mgmt_&_Orgs_layout.json";
import type { CellMeta, LayoutMeta } from "@/app/features/maps/components/HotTableView";

const cellData = cellDataJson as CellMeta[];
const layoutData = layoutDataJson as LayoutMeta;

export default function MgmtAndOrgs() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Management & Organizations</h2>

      <HotTableView
        cellData={cellData}
        layoutData={layoutData}
      />
    </div>
  );
}