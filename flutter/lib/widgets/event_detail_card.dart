import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../constants/theme_color.dart';
import '../constants/theme_text.dart';

//Widget for the event_detail_page.dart
class CompetencyDetailCard extends StatelessWidget {
  final String? date;
  final String? startTime;
  final String? endTime;
  final String? description;
  final String? eventType;
  final String? location;
  final String? responsiblePerson;
  final String? url;

  const CompetencyDetailCard({
    this.date,
    this.startTime,
    this.endTime,
    this.description,
    this.eventType,
    this.location,
    this.responsiblePerson,
    this.url,
    super.key,
  });

  String? _translateDate(String inputDate) {
    DateTime date = DateFormat('yyyy-MM-dd').parse(inputDate);
    return DateFormat('EEEE, MMM dd, yyyy').format(date);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 550,
      padding: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 20,
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(20)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Date & Time:', style: ThemeText.defaultLabelText),
              const SizedBox(height: 5),
              Row(
                children: [
                  if (date != null)
                    Text(
                      '${_translateDate(date!)},  ',
                      style: ThemeText.descriptionText,
                    ),
                  if (startTime != null && endTime != null)
                    Text(
                      '${startTime!}-${endTime!}',
                      style: ThemeText.descriptionTextTime,
                    ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 15),
          Row(
            children: [
              const Text('Location:   ', style: ThemeText.defaultLabelText),
              if (location != null)
                Text(
                  location!,
                  style: ThemeText.descriptionTextTime,
                ),
            ],
          ),
          const SizedBox(height: 15),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Description:\n', style: ThemeText.defaultLabelText),
              if (description != null)
                Text(
                  description!,
                  style: ThemeText.descriptionText,
                ),
            ],
          ),
          const SizedBox(height: 15),
          const DottedLine(dashColor: ThemeColor.dottedLine, dashGapLength: 0),
          const SizedBox(height: 15),
          Row(
            children: [
              const Text('Type:   ', style: ThemeText.defaultLabelText),
              if (eventType != null)
                Text(
                  eventType!,
                  style: ThemeText.descriptionTextType,
                ),
            ],
          ),
          const SizedBox(height: 15),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Responsible Person:',
                  style: ThemeText.defaultLabelText),
              const SizedBox(height: 5),
              if (responsiblePerson != null)
                Text(
                  responsiblePerson!,
                  style: ThemeText.descriptionText,
                ),
            ],
          ),
          const SizedBox(height: 15),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Link:', style: ThemeText.defaultLabelText),
              const SizedBox(height: 5),
              if (url != null)
                Text(
                  url!,
                  style: ThemeText.descriptionText,
                ),
            ],
          )
        ],
      ),
    );
  }
}
