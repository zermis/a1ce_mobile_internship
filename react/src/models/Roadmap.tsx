import { StudentCompetency } from './Student';

export interface Roadmap {
    id: string;
    year: number;
    semester: string;
    student: string;
    milestones: Milestone[];
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    status_val: number;
    status: string;
    created: string;
    target_completion_date: string;
    actual_completion_date: string | null;
    competency_card: StudentCompetency;
}
