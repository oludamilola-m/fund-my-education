class Auth {
  static get token() {
    return localStorage.getItem("token");
  }

  static login(token) {
    localStorage.setItem("token", token);
  }

  static logout() {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  static get isLoggedIn() {
    return !!localStorage.getItem("token");
  }
}

export default Auth;
