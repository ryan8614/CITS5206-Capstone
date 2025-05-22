'use client';

import React from'react';
import { Slider } from 'antd';
import HotTableView from "@/app/features/maps/components/HotTableView";
import type { CellMeta, LayoutMeta } from "@/app/features/maps/components/HotTableView";
import { useEffect, useState, useRef } from 'react';

export default function GF_CSI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellData, setCellData] = useState<CellMeta[] | null>(null);
  const [layoutData, setLayoutData] = useState<LayoutMeta | null>(null);
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
      async function fetchMapData() {
        try {
          const res = await fetch("/api/get-map-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mapName: "mgmt_&_orgs" })
          });
    
          if (!res.ok) throw new Error("Failed to fetch map data");
    
          const data = await res.json();
          setCellData(data.cells);
          setLayoutData(data.layout);
        } catch (err) {
          console.error(err);
        }
      }
    
      fetchMapData();
    }, []);
  
  const handleSave = async () => {
    if (!cellData || !layoutData) return;
    try {
      const res = await fetch("/api/save-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "mgmt_&_orgs",
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
    <div className="flex flex-col w-full border-2"
      style={{
        height: 'calc(90vh - 4rem)', // Limit height to 90vh - navbar height
        overflow: 'auto',             // Allow scrolling if content exceeds height
      }}
    >
      <div className='flex justify-between items-center mb-4 px-4 pt-4'>
        <h2 className="text-xl font-bold">Mgmt & Orgs</h2>
      </div>

      <div className="px-4 mb-2">
        <Slider
          min={0.5}
          max={2}
          step={0.05}
          value={scale}
          onChange={(value) => {
            if (typeof value === 'number') {
              setScale(value);
            }
          }}
          tooltip={{ formatter: (value) => `${Math.round((value ?? 1) * 100)}%` }}
        />
      </div>

      <div
        className="flex-grow px-4"
        style={{
          overflow: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      >
        {cellData && layoutData ? (
          <div style={{ width: 'fit-content', height: 'fit-content' }}>
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  minWidth: '3300px',   
                  minHeight: '200px',   
                }}
              >
                <HotTableView
                  cellData={cellData}
                  layoutData={layoutData}
                  onUpdate={(newCells, newLayout) => {
                    setCellData(newCells);
                    setLayoutData(newLayout);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="p-4">Loading table...</p>
        )}
      </div>
    </div>
  );
}