'use client';

import React, { useRef, RefObject } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { useFilteredContacts } from '@/app/features/contacts/components/useFilteredContacts';
import { coloredRowRenderer } from '@/app/features/contacts/components/coloredRowRenderer';
import { usePreventScrollBleed } from '@/app/features/contacts/components/usePreventScrollBleed';
import { saveTableData } from '@/app/features/contacts/components/saveTableData';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { Button } from 'antd';

// register Handsontable's modules
registerAllModules();

export default function Economics() {
  const data = useFilteredContacts('ECONOMICS');
  const containerRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<any>(null);

  // prevent scroll bleed
  usePreventScrollBleed(containerRef as RefObject<HTMLDivElement>, '.ht_master .wtHolder');
  const classification = 'ECONOMICS'

  return (
    <div className="h-auto p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Econimics Staff</h2>
        <Button
          type="primary"
          onClick={() => {
            console.log('Saving Economics staff data');
            saveTableData(hotRef, data, classification);
          }}
        >
          Save Changes
        </Button>
      </div>

      <div
        ref={containerRef}
        className="border rounded shadow bg-white overflow-auto h-[90vh] overscroll-contain"
      >
        <HotTable
          ref={hotRef}
          data={data}
          width="100%"
          height="100%"
          colHeaders={['Full Name', 'Position', 'Ext No', 'Room', 'Source']}
          columns={[
            { data: 'Full Name' },
            { data: 'Position' },
            { data: 'Ext No' },
            { data: 'Room' },
            {
              data: 'source',
              type: 'dropdown',
              source: ['Academic', 'Research'],
              strict: true,
              allowInvalid: false
            }
          ]}
          colWidths={[300, 400, 150, 150, 150]}
          rowHeaders={true}
          contextMenu={{
            items: [
              'row_above',
              'row_below',
              'remove_row',
              'undo',
              'redo',
            ],
          }}
          manualColumnResize={true}
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation"
          stretchH="all"
          cells={(row, col) => ({
            renderer: coloredRowRenderer,
          })}
        />
      </div>
    </div>
  );
}