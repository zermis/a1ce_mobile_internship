import 'package:a1ce_mobile/models/calender_model.dart';
import 'package:flutter/cupertino.dart';

import '../../services/get_calender_event_data.dart';

class CalenderController {
  //Function that returns the list of events
  Future<List<CalendarEvent?>> getEvents(String date, String endDate) async {
    final eventData =
        await CalenderEventService().getCalenderEventData(date, endDate);
    final eventList = eventData.where((e) => e.date == date).toList();
    return eventList;
  }

  //Function that returns the date of the competency
  Future<List<CalendarEvent?>> getDates(String date, String endDate) async {
    final eventData =
        await CalenderEventService().getCalenderEventData(date, endDate);
    final dateList = eventData.where((e) => e.date == date).toList();
    return dateList;
  }

  //takes in the id of an event and returns the event detail info as list
  Future<CalendarEvent?> getEventDetailInfo(
      String id, String date, String endDate) async {
    final eventData =
        await CalenderEventService().getCalenderEventData(date, endDate);
    final event = eventData.firstWhere((e) => e.id == id);
    //return makeup data
    final event2 = CalendarEvent(
      id: '1',
      title: 'title',
      date: '2021-10-10',
      startTime: '10:00',
      endTime: '11:00',
      location: 'location',
      description: 'description',
      eventType: 'eventType',
      responsiblePerson: 'responsiblePerson',
      url: 'url',
    );

    if (event == null) {
      return event2;
    }
    
    print('event1: $event');
    print('id1: ${event.id}');
    return event;
  }

  //takes in the id of an event and returns the event detail title
  Future<String?> getEventDetailTitle(
      String id, String date, String endDate) async {
    final eventData =
        await CalenderEventService().getCalenderEventData(date, endDate);
    final event = eventData.firstWhere((e) => e.id == id);

    //return makeup data
    final event2 = CalendarEvent(
      id: '1',
      title: 'title',
      date: '2021-10-10',
      startTime: '10:00',
      endTime: '11:00',
      location: 'location',
      description: 'description',
      eventType: 'eventType',
      responsiblePerson: 'responsiblePerson',
      url: 'url',
    );

    if (event == null) {
      return event2.title;
    }
    print('event2: $event');
    print('id2: ${event.id}');
    return event.title;
  }
}
