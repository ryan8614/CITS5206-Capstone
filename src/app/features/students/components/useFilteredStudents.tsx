import { useState, useEffect } from 'react';

type Person = {
  Name: string;
  "End Date": string | null;
  Comment: string | null;
  "Pod No": string | null;
  Type: string | null;
};

type StudentData = Record<string, Person[]>;

/**
 * export function useFilteredStudents(officeLocation: string): Person[]
 * @param officeLocation: string - the office location to filter students by
 * @param returns: Person[] - an array of students filtered by the given office location
 */
export function useFilteredStudents(officeLocation: string): Person[] {
  const [students, setStudents] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/maps/students.json");
        const data: StudentData = await res.json();

        if (data.hasOwnProperty(officeLocation)) {
          setStudents(data[officeLocation]);
        } else {
          setStudents([]);
          console.warn(`Office location "${officeLocation}" does not exist in the data.`);
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        setStudents([]);
      }
    }

    if (officeLocation) {
      fetchData();
    }
  }, [officeLocation]);

  return students;
}