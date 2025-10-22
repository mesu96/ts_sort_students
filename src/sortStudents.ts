
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

    switch (sortBy) {
      case SortType.Name:
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case SortType.Surname:
        valueA = a.surname.toLowerCase();
        valueB = b.surname.toLowerCase();
        break;
      case SortType.Age:
        valueA = a.age;
        valueB = b.age;
        break;
      case SortType.Married:
        valueA = a.married ? 1 : 0;
        valueB = b.married ? 1 : 0;
        break;
      case SortType.AverageGrade:
        valueA = avg(a.grades);
        valueB = avg(b.grades);
        break;
      default:
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
