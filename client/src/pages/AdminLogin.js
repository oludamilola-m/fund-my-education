import React, { Fragment } from "react";
import useStatefulFields from "../custom-hooks/useStatefulFields";
import useAuthSubmit from "../custom-hooks/useAuthSubmit";

import { Link } from "react-router-dom";

const AdminLogin = () => {
  const fields = ["username", "password"];
  const [user, handleChange] = useStatefulFields();
  const [errors, handleSubmit] = useAuthSubmit(
    "/api/admin/login",
    user,
    fields,
    "/fundings/new"
  );

  return (
    <Fragment>
      <div style={{ borderTop: "1px solid rgb(241 239 239)" }}></div>
      <div className="authentication-form login">
        <h2>ADMIN LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username </label>
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            <span className="input-error">{errors.username}</span>
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <span className="input-error">{errors.password}</span>
          </div>
          <div>
            <input type="submit" value="Login" className="auth-btn" />
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/register"> Register!</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
