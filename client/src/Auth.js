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
    window.location.replace("/login");
  }

  static get isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  static get isAdmin() {
    if (!!localStorage.getItem("token")) return false;

    return localStorage.getItem("admin");
  }
}

export default Auth;
