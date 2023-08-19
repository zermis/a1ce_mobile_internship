class CalendarEvent {
  final String? id;
  final String? title;
  final String? description;
  final int? eventTypeVal;
  final String? eventType;
  final String? responsiblePerson;
  final String? location;
  final String? date;
  final String? startTime;
  final String? endTime;
  final String? url;
  final String? urlLabel;
  final RelatedCompetency? relatedCompetencies;

  CalendarEvent({
    this.id,
    this.title,
    this.description,
    this.eventTypeVal,
    this.eventType,
    this.responsiblePerson,
    this.location,
    this.date,
    this.startTime,
    this.endTime,
    this.url,
    this.urlLabel,
    this.relatedCompetencies,
  });

  factory CalendarEvent.fromJson(Map<String, dynamic> json) {
    return CalendarEvent(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      eventTypeVal: json['event_type_val'],
      eventType: json['event_type'],
      responsiblePerson: json['responsible_person'],
      location: json['location'],
      date: json['date'],
      startTime: json['start_time'],
      endTime: json['end_time'],
      url: json['url'],
      urlLabel: json['url_label'],
      relatedCompetencies: json['related_competencies'],
    );
  }
}

class RelatedCompetency {
  final String? id;
  final String? title;
  final String? description;

  RelatedCompetency({this.id, this.title, this.description});

  factory RelatedCompetency.fromJson(Map<String, dynamic> json) {
    return RelatedCompetency(
      id: json['id'],
      title: json['title'],
      description: json['description'],
    );
  }
}
