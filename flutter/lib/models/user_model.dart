class User {
  final String? id;
  final List<UserRole>? roles;
  final String? name;
  final String? email;

  User({
    this.id,
    this.roles,
    this.name,
    this.email,
  });

  factory User.fromJson(Map<String, dynamic> json) {

      var list = json['roles'] as List;
      List<UserRole> roleList = list.map((i) => UserRole.fromJson(i)).toList();

    return User(
      id: json['id'],
      roles: roleList,
      name: json['name'],
      email: json['email'],
    );
  }
}

class UserRole {
  final int? role;
  final String? roleId;

  UserRole({
    this.role,
    this.roleId,
  });

  factory UserRole.fromJson(Map<String, dynamic> json) {
    return UserRole(
      role: json['role'],
      roleId: json['role_id'],
    );
  }
}
