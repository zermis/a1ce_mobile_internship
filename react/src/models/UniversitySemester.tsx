export interface UniversitySemester {
    id: string;
    semester_name: string;
    university_name: string;
    university_code: string;
    start_date: string;
    end_date: string;
    add_drop_date: string;
}

export interface FormatYearSemester {
    years: string[];
    semesters: {
        [key: string]: string[];
    };
}

export interface CurrentYearSemester {
    year: string;
    semester: string;
}
