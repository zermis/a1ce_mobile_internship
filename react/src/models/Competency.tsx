export interface Competency {
    id: string;
    title: string;
    description: string;
    required: boolean;
    credits: number;
    min_optional: number;
    skills: Skill[];
}

export interface Skill {
    id: string;
    title: string;
    description: string;
    required: boolean;
    assessment: Assessment;
}

export interface Assessment {
    id: string;
    title: string;
    description: string;
    external_url: string;
}
