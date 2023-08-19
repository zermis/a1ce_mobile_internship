import 'package:a1ce_mobile/screens/calender_page.dart';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/webview_flutter.dart';

/*
authentication page to check if get cookie or not
If get cookie, navigate to dashboard page
*/
class AuthenticationPage extends StatefulWidget {
  const AuthenticationPage({super.key});

  @override
  State<AuthenticationPage> createState() => _AuthenticationPageState();
}

class _AuthenticationPageState extends State<AuthenticationPage> {
  late final WebViewController controller;
  final cookieManager = WebviewCookieManager();

  String cookieValue = '';
  final String url = 'https://a1ce.cmkl.ac.th:/api/login';

  //make function _getCookie
  Future _signIn(String url) async {
    final gotCookies = await cookieManager.getCookies(url);
    for (var item in gotCookies) {
      cookieValue = item.toString(); //get cookie
    }
    final checkCookie = await cookieManager.hasCookies();

    if (checkCookie == true && cookieValue.startsWith('jwt')) {
      debugPrint('Got cookie!');
      if (context.mounted) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (BuildContext context) {
              return const CalenderPage();
            },
          ),
        );
      }
    } else {
      debugPrint('Dont have cookie!');
    }
  }

  @override
  void initState() {
    super.initState();
    //cookieManager.clearCookies(); //clear cookie

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setUserAgent('random')
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            debugPrint('WebView is loading (progress : $progress%)');
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {
            _signIn(url); // Get cookies here.
          },
          onWebResourceError: (WebResourceError error) {},
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.startsWith('https://google.com')) {
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(url));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter WebView'),
      ),
      body: WebViewWidget(
        controller: controller,
      ),
    );
  }
}
