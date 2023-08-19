import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import '../models/user_model.dart';

class UserService {
  static const String apiUrl = 'https://a1ce.cmkl.ac.th/api/user';
  final cookieManager = WebviewCookieManager();

  //function to get cookie and return is as a string  
  Future<String> _getCookie() async {
    final getCookie = await cookieManager.getCookies(apiUrl);
    String cookie = getCookie.toString();
    cookie = cookie.substring(1, cookie.length - 1);//remove the [ and ] from the cookie
    return cookie;
  }

//Function to get user data into a list of User (email and name)
  Future<List<User>> getUserData() async {
    final url = Uri.parse(apiUrl);

    final String cookieValue = await _getCookie();

    final headers = {
      'Content-Type': 'application/json',
      'Cookie': cookieValue,
    };

    final response = await http.get(url, headers: headers);
    final decodedResponse = jsonDecode(response.body);

    if (response.statusCode == 200) {
      final User user = User.fromJson(decodedResponse['user']);
      return [user];
    } else {
      throw Exception('Failed to load user data');
    }
  }
}
