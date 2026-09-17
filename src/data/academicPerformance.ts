export interface SemesterData {
  semester: string;
  semShort: string;
  semNum: number;
  cgpa: number;
  isLatest?: boolean;
}

export const academicPerformance: SemesterData[] = [
  { semester: 'Semester 1', semShort: '01', semNum: 1, cgpa: 9.05 },
  { semester: 'Semester 2', semShort: '02', semNum: 2, cgpa: 9.25 },
  { semester: 'Semester 3', semShort: '03', semNum: 3, cgpa: 9.40 },
  { semester: 'Semester 4', semShort: '04', semNum: 4, cgpa: 9.22 },
  { semester: 'Semester 5', semShort: '05', semNum: 5, cgpa: 9.25 },
  { semester: 'Semester 6', semShort: '06', semNum: 6, cgpa: 9.27, isLatest: true },
];

export const currentAcademicOverview = {
  degree: 'B.Tech Computer Science Engineering',
  institution: 'JECRC University · Final Year',
  currentCGPA: '9.27',
  maxCGPA: '10.0',
};
