import 'package:a1ce_mobile/screens/controllers/user_controller.dart';
import 'package:date_picker_timeline/date_picker_timeline.dart';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import '../components/navigation_drawer_2.dart';
import 'package:intl/intl.dart';
import '../constants/theme_color.dart';
import '../constants/theme_text.dart';
import '../models/calender_model.dart';
import '../widgets/event_card.dart';
import 'controllers/calender_controller.dart';

/*
CalenderPage to show calender
*/
class CalenderPage extends StatefulWidget {
  const CalenderPage({super.key});

  @override
  State<CalenderPage> createState() => _CalenderPageState();
}

class _CalenderPageState extends State<CalenderPage> {
  final cookieManager = WebviewCookieManager();
  final userController = UserController();
  final calenderController = CalenderController();
  final String url = 'https://a1ce.cmkl.ac.th:/api  /login';

  String translatedDate = "";
  DateTime testInitialDate = DateTime(2023, 01, 30);
  DateTime startDate = DateTime.now();
  late String selectedDate = DateFormat('yyyy-MM-dd')
      .format(testInitialDate); //selectedDate is also startDate
  //endDate here is just the selectedDate + 6 days so 2023-02-05 will be 2023-02-11
  late String endDate =
      DateFormat('yyyy-MM-dd').format(startDate.add(const Duration(days: 6)));

  late String selectedDateFormat = DateFormat('MM/DD E').format(startDate);

  FutureBuilder<List<CalendarEvent?>> _getEvents({
    required CalenderController controller,
    required String date,
    required String endDate,
  }) =>
      FutureBuilder(
        future: controller.getEvents(date, endDate),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final eventInfoList = snapshot.data as List<CalendarEvent>;

            if (eventInfoList.isEmpty) {
              return Container(
                color: Colors.white,
                child: const Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Well Done!',
                      style: ThemeText.noEventText,
                    ),
                    Text(
                      'Your event is empty this day',
                      style: ThemeText.noEventText,
                    ),
                    Image(
                      image: AssetImage('assets/images/sleeping_panda.png'),
                    ),
                  ],
                ),
              );
            }

            return ListView.builder(
              itemCount: eventInfoList.length,
              itemBuilder: (context, index) {
                final eventInfo = eventInfoList[index];

                return CompetencyCard(
                  title: eventInfo.title,
                  eventType: eventInfo.eventType,
                  startTime: eventInfo.startTime,
                  endTime: eventInfo.endTime,
                  id: eventInfo.id,
                );
              },
            );
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          } else {
            return const Text('');
          }
        },
      );

  FutureBuilder<String?> _getDates({
    required CalenderController controller,
    required String date,
    required String endDate,
  }) =>
      FutureBuilder(
        future: controller.getDates(date, endDate).then((eventList) {
          if (eventList.isNotEmpty) {
            final dateInfo = eventList[0];
            return dateInfo?.date;
          } else {
            return null;
          }
        }),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final dateInfo = snapshot.data as String;

            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                  child: Text(
                '${_translateDate(dateInfo)}',
                style: ThemeText.dateText,
              )),
            );
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          } else {
            return const Text('');
          }
        },
      );

//Function to translate date from yyyy-MM-dd to dd/MM E
  String? _translateDate(String inputDate) {
    DateTime date = DateFormat('yyyy-MM-dd').parse(inputDate);
    return DateFormat('dd/MM E').format(date);
  }

//Function to select date from the datepicker and returns the date as string
  DateTime _selectDate(DateTime date) {
    setState(() {
      startDate = date;
    });
    selectedDate = DateFormat('yyyy-MM-dd').format(date);
    return date;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
            backgroundColor: ThemeColor.appBarColor,
            title: const Text(
              'Calendar',
              style: TextStyle(
                color: Colors.white,
                fontSize: 25,
              ),
            ),
            flexibleSpace: Container(
              decoration: const BoxDecoration(
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
        drawer: const NavigationDrawer2(),
        body: Column(
          children: [
            Flexible(
              flex: 1,
              fit: FlexFit.loose,
              child: Container(
                decoration: BoxDecoration(
                  color: ThemeColor.bodyColor,
                  borderRadius: BorderRadius.circular(10),
                ),
                height: 170,
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Flexible(
                      flex: 1,
                      fit: FlexFit.tight,
                      child: Container(
                        color: Colors.transparent,
                        height: 40,
                        child: SizedBox(
                          width: 500,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Flexible(
                                flex: 1,
                                fit: FlexFit.tight,
                                child: IconButton(
                                  icon: const Icon(Icons.arrow_back_ios),
                                  onPressed: () {
                                    setState(() {
                                      testInitialDate = testInitialDate
                                          .subtract(const Duration(
                                              days: 7)); //subtract 7 days
                                    });
                                  },
                                ),
                              ),
                              Flexible(
                                flex: 5,
                                fit: FlexFit.loose,
                                child: Text(
                                  DateFormat.yMMMM().format(testInitialDate),
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              Flexible(
                                flex: 1,
                                fit: FlexFit.tight,
                                child: IconButton(
                                  icon: const Icon(Icons.arrow_forward_ios),
                                  onPressed: () {
                                    setState(() {
                                      testInitialDate = testInitialDate.add(
                                          const Duration(days: 7)); //add 7 days
                                    });
                                  },
                                ),
                              ),
                              Flexible(
                                flex: 1,
                                fit: FlexFit.tight,
                                child: IconButton(
                                  icon: const Icon(Icons.edit_calendar_rounded),
                                  onPressed: () {
                                    //open up datepicker so user can select specific date
                                    /***not linked to the datepicker so be some bugs */
                                    showDatePicker(
                                      context: context,
                                      initialDate: testInitialDate,
                                      firstDate: DateTime(2021),
                                      lastDate: DateTime(2025),
                                    ).then((date) {
                                      if (date != null) {
                                        _selectDate(date);
                                        //update the on datepicker as well
                                        setState(() {
                                          testInitialDate = date;
                                        });
                                      }
                                    });
                                  },
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Container(
                      color: Colors.transparent,
                      height: 90,
                      child: DatePicker(
                        //DATEPICKER calender selector
                        testInitialDate, //using initial date to test events for now
                        height: 90,
                        width: 45,
                        initialSelectedDate: testInitialDate,
                        selectionColor: Colors.transparent,
                        selectedTextColor: ThemeColor.calenderText,
                        deactivatedColor: Colors.black,
                        dateTextStyle: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: Colors.black,
                        ),
                        daysCount: 7,
                        onDateChange: _selectDate,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Flexible(
              flex: 3,
              fit: FlexFit.tight,
              child: Container(
                decoration: BoxDecoration(
                  color: ThemeColor.calenderBackground,
                  borderRadius: BorderRadius.circular(10),
                ),
                height: 550,
                width: 400,
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.all(10),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Container(
                            decoration: BoxDecoration(
                                color: ThemeColor.competencyCard,
                                borderRadius: BorderRadius.circular(10)),
                            height: 500,
                            width: 50,
                            child: _getDates(
                                controller: calenderController,
                                date: selectedDate,
                                endDate: endDate)),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Container(
                            decoration: const BoxDecoration(
                              color: ThemeColor.calenderBackground,
                              borderRadius: BorderRadius.only(),
                            ),
                            height: 500,
                            width: 320,
                            child: _getEvents(
                              controller: calenderController,
                              date: selectedDate,
                              endDate: endDate,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
