export interface Pillar {
    id: number;
    title: string;
    description: string;
    code: string;
    is_core: boolean;
    subdomains: Subdomain[];
}

export interface Subdomain {
    id: string;
    title: string;
    description: string;
    knowledge_areas: KnowledgeArea[];
}

export interface KnowledgeArea {
    id: string;
    title: string;
    description: string;
}
