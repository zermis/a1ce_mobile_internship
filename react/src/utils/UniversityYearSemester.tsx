import moment from 'moment';
import { SEMESTER } from '../constants/Semester';
import {
    CurrentYearSemester,
    FormatYearSemester,
    UniversitySemester
} from '../models/UniversitySemester';

export const FindCurrentYearAndSemester = (
    semesterData: UniversitySemester[]
): [CurrentYearSemester, boolean] => {
    const result = { semester: '', year: '' };
    const currentDate = moment(new Date());
    let isFound = false;

    for (let i = 0; i < semesterData.length; i++) {
        const startDate = moment(semesterData[i].start_date, 'YYYY-MM-DD');
        const endDate = moment(semesterData[i].end_date, 'YYYY-MM-DD');

        if (startDate <= currentDate && currentDate <= endDate) {
            const currentYearAndSem = semesterData[i].semester_name.split(' ');

            if (currentYearAndSem.length == 2) {
                result.semester = currentYearAndSem[0];
                result.year = currentYearAndSem[1];
                isFound = true;

                return [result, isFound];
            }
        }
    }

    return [result, isFound];
};

export const FormatYearAndSemester = (
    semesterData: UniversitySemester[]
): FormatYearSemester => {
    const result: FormatYearSemester = { years: [], semesters: {} };

    for (let i = 0; i < semesterData.length; i++) {
        const semname = semesterData[i].semester_name.split(' ', 2)[0];
        const semyear = semesterData[i].semester_name.split(' ', 2)[1];

        if (semname && semyear) {
            if (!result.years.includes(semyear)) {
                result.years.push(semyear);
                result.semesters[semyear] = [semname];
            } else {
                result.semesters[semyear].push(semname);
            }
        }
    }

    const keys = Object.keys(result.semesters);
    keys.forEach((key) => {
        result.semesters[key] = result.semesters[key].sort(
            (a, b) => SEMESTER.indexOf(a) - SEMESTER.indexOf(b)
        );
    });
    result.years = result.years.sort();

    return result;
};
