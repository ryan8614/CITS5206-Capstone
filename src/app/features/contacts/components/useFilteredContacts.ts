import { StaffEntry } from './types'
import { useState, useEffect } from 'react'

/**
 * Returns a filtered list of StaffEntry based on the given filter.
 * @param filter Classification name (e.g. 'AccFin')
 * @returns StaffEntry[]
 */


export function useFilteredContacts(filter: string) {
  const [result, setResult] = useState<StaffEntry[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/data/contact_list/contact_list.json");
      const contact_list: Record<string, StaffEntry[]> = await res.json();

      const academic = (contact_list['Academic Staff'] || [])
        .filter(e => e.Classification)
        .map(e => ({ ...e, source: "Academic" as const }));

      const research = (contact_list['Research Fellows/Adjunct Professor'] || [])
        .filter(e => e.Classification)
        .map(e => ({ ...e, source: "Research" as const }));

      const all = [...academic, ...research];
      setResult(all.filter(entry => entry.Classification === filter));
    }

    load();
  }, [filter]);

  return result;
}