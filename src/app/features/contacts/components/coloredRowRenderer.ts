import Handsontable from 'handsontable'

export function coloredRowRenderer(
  instance: Handsontable.Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: any,
  cellProperties: Handsontable.CellProperties
) {
  Handsontable.renderers.TextRenderer.call(
    instance,
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  )

  const rowData = instance.getSourceDataAtRow(row)

  if (typeof rowData === 'object' && rowData !== null && 'source' in rowData) {
    const source = (rowData as any).source
    if (source === 'Academic') {
      td.style.backgroundColor = '#fee2e2' // red
    } else if (source === 'Research') {
      td.style.backgroundColor = '#dcfce7' // green
    }
  }
}