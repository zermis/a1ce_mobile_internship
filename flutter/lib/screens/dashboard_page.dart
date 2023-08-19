import 'package:a1ce_mobile/screens/controllers/user_controller.dart';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import '../constants/theme_color.dart';
import '../components/navigation_drawer_2.dart';

/*
Dashboard screen
*/
class DashBoardPage extends StatefulWidget {
  const DashBoardPage({super.key});

  @override
  State<DashBoardPage> createState() => _DashBoardPageState();
}

class _DashBoardPageState extends State<DashBoardPage> {
  final cookieManager = WebviewCookieManager();
  final controller = UserController();
  final String url = 'https://a1ce.cmkl.ac.th:/api/login';

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
            backgroundColor: ThemeColor.appBarColor,
            title: const Text(
              'Dashboard',
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
        body: const Center(
          child: Column(
            children: [
              Text(
                'This is the Dashboard',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 25,
                ),
              )
            ],
          ),
        ),
        drawer: const NavigationDrawer2(),
      ),
    );
  }
}
