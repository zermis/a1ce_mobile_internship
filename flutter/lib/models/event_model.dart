class Event {
  final String? title;
  final String? eventType;
  final String? startTime;
  final String? endTime;

  Event({
    this.title,
    this.eventType,
    this.startTime,
    this.endTime,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      title: json['title'],
      eventType: json['event_type'],
      startTime: json['start_time'],
      endTime: json['end_time'],
    );
  }
}
