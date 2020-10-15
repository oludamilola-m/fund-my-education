class Auth {
  static get token() {
    return localStorage.getItem("token");
  }

  static login(token, admin = false) {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", admin);
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.replace("/login");
  }

  static get isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  static isAdmin() {
    if (!!localStorage.getItem("token")) {
      return (
        localStorage.getItem("admin") && localStorage.getItem("admin") == "true"
      );
    }

    return false;
  }
}

export default Auth;
