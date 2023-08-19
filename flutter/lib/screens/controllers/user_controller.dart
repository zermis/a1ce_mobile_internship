import '../../services/get_user_data.dart';

class UserController {
  //get user name
  Future<String?> getFirstName() async {
    final userData = await UserService().getUserData();
    final firstName = userData[0].name;
    return firstName;
  }

  //get user email
  Future<String?> getEmail() async {
    final userData = await UserService().getUserData();
    final email = userData[0].email;
    return email;
  }
}
