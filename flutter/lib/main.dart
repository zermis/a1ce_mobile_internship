import 'package:a1ce_mobile/constants/theme_color.dart';
import 'package:flutter/material.dart';
import 'package:a1ce_mobile/screens/home_page.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(scaffoldBackgroundColor: ThemeColor.bodyColor),
      home: const HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}
