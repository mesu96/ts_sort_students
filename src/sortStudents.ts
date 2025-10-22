
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'Name',
  Surname = 'Surname',
  Age = 'Age',
  Married = 'Married',
  AverageGrade = 'AverageGrade',
}

export type SortOrder = 'asc' | 'desc';

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const studentsCopy = [...students];

  const avg = (grades: number[]):
  number => grades.reduce((sum, g) => sum + g, 0) / grades.length;

  return studentsCopy.sort((a, b) => {
    let valueA: string | number | boolean;
    let valueB: string | number | boolean;

    if (sortBy === SortType.Name || sortBy === SortType.Surname) {
      const key = sortBy === SortType.Name ? 'name' : 'surname';

      valueA = a[key].toLowerCase();
      valueB = b[key].toLowerCase();
    } else if (sortBy === SortType.Age) {
      valueA = a.age;
      valueB = b.age;
    } else if (sortBy === SortType.Married) {
      valueA = a.married ? 1 : 0;
      valueB = b.married ? 1 : 0;
    } else if (sortBy === SortType.AverageGrade) {
      valueA = avg(a.grades);
      valueB = avg(b.grades);
    } else {
      return 0;
    }

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }

    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}
