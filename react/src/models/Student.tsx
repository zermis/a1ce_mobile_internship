export interface Student {
    id: string;
    first_name: string;
    last_name: string;
    nickname: string;
    first_term: string;
    last_term: string;
    cmkl_id: number;
    advisor: string;
}

export interface StudentAvatar {
    avatar: string;
}

export interface HistoryEvent {
    id: string;
    date_time: Date;
    event_type_val: number;
    event_type: string;
    event_description: string;
}

export interface StudentCompetency {
    id: string;
    template_id: string;
    title: string;
    description: string;
    required: boolean;
    credits: number;
    status_val: number;
    status: string;
    mastery_level: number;
    total_skills?: number;
    assessed_skills?: number;
    skills: StudentSkill[];
}

export interface StudentSkill {
    id: string;
    title: string;
    description: string;
    required: boolean;
    assessment: StudentAssessment;
}

export interface StudentAssessment {
    id: string;
    title: string;
    description: string;
    result: number;
    assessment_time: string | null;
    external_url: string;
}
