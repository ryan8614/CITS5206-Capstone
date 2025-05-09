import contact_list from '@/app/features/contacts/data/contact_list.json'
import { StaffEntry } from './types'

/**
 * Returns a filtered list of StaffEntry based on the given filter.
 * @param filter Classification name (e.g. 'ACCOUNTING AND FINANCE')
 * @returns StaffEntry[]
 */
export function useFilteredContacts(filter: string): StaffEntry[] {
  const academic = (contact_list['Academic Staff'] || [])
    .filter(entry => entry.Classification !== null)
    .map(entry => ({
      ...entry,
      source: 'Academic' as const,
    }));

  const research = (contact_list['Research Fellows/Adjunct Professor'] || [])
    .filter(entry => entry.Classification !== null)
    .map(entry => ({
      ...entry,
      source: 'Research' as const,
    }));

  const all = [...academic, ...research];

  return all.filter(entry => entry.Classification === filter)
}