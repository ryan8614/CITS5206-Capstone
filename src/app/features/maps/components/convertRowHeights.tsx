export function convertRowHeights(heights: Record<string, number>): number[] {
    const maxIndex = Math.max(...Object.keys(heights).map(k => parseInt(k)));
    return Array.from({ length: maxIndex }, (_, i) => {
      const h = heights[i + 1]?.valueOf(); 
      return h ? h * 2 : 24;
    });
  }
  
export function convertColWidths(widths: Record<string, number>): number[] {
    const colIndex = (col: string) =>
        col.split('').reduce((acc, c, i) => acc * 26 + (c.charCodeAt(0) - 64), 0) - 1;

    const maxIndex = Math.max(...Object.keys(widths).map(colIndex));
    const result = Array(maxIndex + 1).fill(80); 

    for (const [col, width] of Object.entries(widths)) {
        const idx = colIndex(col);
        result[idx] = width * 7; 
    }

    return result;
    }