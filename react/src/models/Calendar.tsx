export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    event_type_val: number;
    event_type: string;
    responsible_person: string;
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    url: string;
    url_label: string;
    related_competencies: RelatedCompetency[];
}

export interface RelatedCompetency {
    id: string;
    title: string;
    description: string;
}
