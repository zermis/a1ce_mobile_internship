import 'package:flutter/material.dart';
import '../constants/theme_color.dart';
import '../constants/theme_text.dart';
import '../screens/event_detail_page.dart';

//Widget for the calendar_page.dart
class CompetencyCard extends StatelessWidget {
  final String? title;
  final String? eventType;
  final String? startTime;
  final String? endTime;
  final String? date;
  final String? id;

  const CompetencyCard({
    this.title,
    this.eventType,
    this.startTime,
    this.endTime,
    this.date,
    this.id,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(1.0),
      child: Container(
        height: 100,
        padding: const EdgeInsets.symmetric(
          horizontal: 10,
          vertical: 10,
        ),
        decoration: const BoxDecoration(
          color: ThemeColor.competencyCard,
        ),
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  height: 60,
                  color: Colors.transparent,
                  child: const Image(
                    image: AssetImage('assets/images/start_end_time_icon.png'),
                  ),
                ),
                const SizedBox(width: 5),
                Container(
                  color: Colors.transparent,
                  child: Column(
                    children: [
                      if (startTime != null)
                        Text(
                          startTime!,
                          style: ThemeText.competencyTime,
                        ),
                      const SizedBox(height: 35),
                      if (endTime != null)
                        Text(
                          endTime!,
                          style: ThemeText.competencyTime,
                        ),
                    ],
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: Container(
                    width: 400,
                    height: 75,
                    color: Colors.transparent,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (title != null)
                          Text(
                            title!,
                            maxLines: 3,
                            overflow: TextOverflow.ellipsis,
                            style: ThemeText.competencyTitle,
                          ),
                        const SizedBox(
                          height: 10,
                        ),
                        if (eventType != null)
                          Text(
                            eventType!,
                            style: ThemeText.competencyEventType,
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                Container(
                  color: Colors.transparent,
                  child: IconButton(
                    icon: const Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onPressed: () {

                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (BuildContext context) {
                            final eventId = id;
                            return EventDetailPage(eventId: eventId!);
                          },
                        ),
                      );
                    },
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
