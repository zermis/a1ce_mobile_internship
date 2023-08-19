import 'package:flutter/material.dart';
import 'package:a1ce_mobile/screens/authentication/authentication.dart';

import '../constants/theme_color.dart';

//Home page with sign in button
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
            backgroundColor: ThemeColor.appBarColor,
            leading: const Row(),
            title: const Text(
              'Home',
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
        body: Center(
          child: ElevatedButton.icon(
            onPressed: () async {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (BuildContext context) {
                    return const AuthenticationPage();
                  },
                ),
              );
            },
            icon: const Icon(Icons.login),
            label: const Text('Sign in with Google'),
          ),
        ),
      ),
    );
  }
}
