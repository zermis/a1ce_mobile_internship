import 'package:flutter/material.dart';
import '../constants/theme_color.dart';
import '../constants/theme_text.dart';
import '../screens/calender_page.dart';
import '../screens/controllers/user_controller.dart';
import '../screens/dashboard_page.dart';
import 'package:dotted_line/dotted_line.dart';

import '../screens/home_page.dart';

/*
Navigation drawer
*/
class NavigationDrawer2 extends StatefulWidget {
  const NavigationDrawer2({super.key});
  @override
  State<NavigationDrawer2> createState() => _NavigationDrawer2State();
}

class _NavigationDrawer2State extends State<NavigationDrawer2> {
  final controller = UserController();

  FutureBuilder<String?> futureFirstName({
    required UserController controller,
  }) =>
      FutureBuilder(
        future: controller.getFirstName(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            String firstName = snapshot.data as String;
            return Text(firstName, style: ThemeText.drawerName);
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          } else {
            return const Text('');
          }
        },
      );

  FutureBuilder<String?> futureEmail({
    required UserController controller,
  }) =>
      FutureBuilder(
        future: controller.getEmail(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            String email = snapshot.data as String;
            return Text(
              email,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
              ),
            );
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          } else {
            return const Text('');
          }
        },
      );
  @override
  Widget build(BuildContext context) => Drawer(
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: [
            SizedBox(
              height: 170,
              child: DrawerHeader(
                  decoration: const BoxDecoration(
                    color: ThemeColor.drawerColor,
                  ),
                  child: Column(
                    children: [
                      const CircleAvatar(
                          radius: 35,
                          backgroundImage: NetworkImage(
                            'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                          )),
                      const SizedBox(height: 15),
                      futureFirstName(
                        controller: controller,
                      ),
                      const SizedBox(height: 10),
                      futureEmail(
                        controller: controller,
                      ),
                    ],
                  )),
            ),
            Container(
              color: ThemeColor.drawerColor,
              child: Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: DottedLine(
                        dashColor: ThemeColor.dottedLine, dashGapLength: 0),
                  ),
                  ListTile(
                    leading: const Icon(
                      Icons.dashboard,
                    ),
                    title: const Text('Dashboard'),
                    onTap: () {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (BuildContext context) {
                            return const DashBoardPage();
                          },
                        ),
                      );
                    },
                  ),
                  ListTile(
                    leading: const Icon(
                      Icons.calendar_today_rounded,
                    ),
                    title: const Text('Calender'),
                    onTap: () {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (BuildContext context) {
                            return const CalenderPage();
                          },
                        ),
                      );
                    },
                  ),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: DottedLine(
                        dashColor: ThemeColor.dottedLine, dashGapLength: 0),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            InkWell(
              child: Container(
                color: ThemeColor.drawerColor,
                child: const Row(
                  children: [
                    SizedBox(width: 20),
                    Icon(
                      Icons.logout,
                      color: Colors.grey,
                    ),
                    SizedBox(width: 10),
                    Text(
                      'Logout',
                      style: ThemeText.drawerLogOut,
                    ),
                  ],
                ),
              ),
              onTap: () {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                    builder: (BuildContext context) {
                      return const HomePage();
                    },
                  ),
                );
              },
            )
          ],
        ),
      );
}
