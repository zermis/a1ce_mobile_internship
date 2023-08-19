import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import '../models/calender_model.dart';

class CalenderEventService {
  static const String apiUrl = 'https://a1ce.cmkl.ac.th/api/calendar/events';
  final cookieManager = WebviewCookieManager();

  //function to get cookie and return is as a string
  Future<String> _getCookie() async {
    final getCookie = await cookieManager.getCookies(apiUrl);
    String cookie = getCookie.toString();
    cookie = cookie.substring(
        1, cookie.length - 1); //remove the [ and ] from the cookie
    return cookie;
  }

//Function to get calender event data into a list of CalenderEvent
  Future<List<CalendarEvent>> getCalenderEventData(
      String startDate, String endDate) async {
    final String cookieValue = await _getCookie();

    final headers = {
      'Content-Type': 'application/json',
      'Cookie': cookieValue,
    };

    final queryParameters = {
      'start_date': startDate,
      'end_date': endDate,
    };

    final uri =
        Uri.https('a1ce.cmkl.ac.th', '/api/calendar/events', queryParameters);

    final response = await http.get(uri, headers: headers);
    final decodedResponse = jsonDecode(response.body);
    print(cookieValue);

    if (response.statusCode == 200) {
      final List<CalendarEvent> eventList = decodedResponse['events']
          .map<CalendarEvent>((i) => CalendarEvent.fromJson(i))
          .toList();
      return eventList;
    } //if it's error, return empty list
    else {
      debugPrint('Error: ${response.statusCode}');
      return [];
    }
  }
}
