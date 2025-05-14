'use client'

import React from'react';
import HotTableView from "@/app/features/maps/components/HotTableView";
import type { CellMeta, LayoutMeta } from "@/app/features/maps/components/HotTableView";
import { useEffect, useState  } from "react";

export default function AccAndFin() {
  const [cellData, setCellData] = useState<CellMeta[] | null>(null);
  const [layoutData, setLayoutData] = useState<LayoutMeta | null>(null);

  useEffect(() => {
    async function loadData() {
      const cellRes = await fetch("/data/maps/cells/accounting_finance_cells.json");
      const layoutRes = await fetch("/data/maps/layouts/accounting_finance_layout.json");

      const cellJson = await cellRes.json();
      const layoutJson = await layoutRes.json();

      setCellData(cellJson);
      setLayoutData(layoutJson);
    }

    loadData();
  }, []);

  const handleSave = async () => {
    if (!cellData || !layoutData) return;
    try {
      const res = await fetch("/api/save-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "accounting_finance",
          cellData,
          layoutData,
        }),
      });
      if (!res.ok) throw new Error("Failed to save data");
      alert("Data saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save data. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-xl font-bold mb-4">Accounting & Finance</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    
      {cellData && layoutData ? (
        <HotTableView
          cellData={cellData}
          layoutData={layoutData}
          onUpdate={(newCells, newLayout) => {
            setCellData(newCells);
            setLayoutData(newLayout);
          }}
        />
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}