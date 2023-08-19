import 'package:a1ce_mobile/screens/controllers/user_controller.dart';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:intl/intl.dart';
import '../constants/theme_color.dart';
import '../constants/theme_text.dart';
import '../models/calender_model.dart';
import '../widgets/event_detail_card.dart';
import 'controllers/calender_controller.dart';

/*
EventDetailPage to show calender
*/
class EventDetailPage extends StatefulWidget {
  final String? eventId;
  const EventDetailPage({this.eventId, Key? key}) : super(key: key);

  @override
  State<EventDetailPage> createState() => _EventDetailPageState();
}

class _EventDetailPageState extends State<EventDetailPage> {
  final cookieManager = WebviewCookieManager();
  final userController = UserController();
  final calenderController = CalenderController();
  final String url = 'https://a1ce.cmkl.ac.th:/api/login';

  String? get eventId => widget.eventId;

  DateTime testInitialDate = DateTime(2023, 01, 30);
  DateTime startDate = DateTime.now();
  late String selectedDate = DateFormat('yyyy-MM-dd').format(testInitialDate);
  late String endDate =
      DateFormat('yyyy-MM-dd').format(startDate.add(const Duration(days: 6)));

  late String selectedDateFormat = DateFormat('MM/DD E').format(startDate);

  FutureBuilder<String?> _getEventDetailTitle({
    required CalenderController controller,
    required String id,
    required String selectedDate,
    required String endDate,
  }) =>
      FutureBuilder(
          future: controller.getEventDetailTitle(id, selectedDate, endDate),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final eventTitle = snapshot.data as String;
              return Text(
                eventTitle,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: ThemeText.eventDetailTitleText,
              );
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            } else {
              return const Text('');
            }
          });

  FutureBuilder<CalendarEvent?> _getEventDetailInfo({
    required CalenderController controller,
    required String id,
    required String selectedDate,
    required String endDate,
  }) =>
      FutureBuilder(
          future: controller.getEventDetailInfo(id, selectedDate, endDate),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final eventInfo = snapshot.data as CalendarEvent;

              return CompetencyDetailCard(
                date: eventInfo.date,
                startTime: eventInfo.startTime,
                endTime: eventInfo.endTime,
                location: eventInfo.location,
                description: eventInfo.description,
                eventType: eventInfo.eventType,
                responsiblePerson: eventInfo.responsiblePerson,
                url: eventInfo.url,
              );
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            } else {
              return const Text('');
            }
          });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: PreferredSize(
          preferredSize: const Size.fromHeight(250),
          child: AppBar(
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.vertical(
                  bottom: Radius.circular(30),
                ),
              ),
              backgroundColor: ThemeColor.appBarColor,
              toolbarHeight: 220,
              title: Column(
                children: [
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        icon: const Icon(
                          Icons.arrow_back_ios,
                          color: Colors.white,
                        ),
                      ),
                      const Text(
                        'Event Detail',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w400),
                      ),
                    ],
                  ),
                  const SizedBox(height: 80),
                  _getEventDetailTitle(
                    controller: calenderController,
                    id: eventId!,
                    selectedDate: selectedDate,
                    endDate: endDate,
                  ),
                ],
              ),
              automaticallyImplyLeading: false,
              flexibleSpace: Container(
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.vertical(
                    bottom: Radius.circular(30),
                  ),
                  gradient: LinearGradient(
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                    colors: [
                      ThemeColor.appBarColor,
                      ThemeColor.appBarColor2,
                    ],
                  ),
                ),
              )),
        ),
        body: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.all(10),
                    height: 550,
                    width: 290,
                    child: _getEventDetailInfo(
                      controller: calenderController,
                      id: eventId!,
                      selectedDate: selectedDate,
                      endDate: endDate,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
