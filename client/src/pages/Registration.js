import React, { Fragment } from "react";
import useStatefulFields from "../custom-hooks/useStatefulFields";
import useAuthSubmit from "../custom-hooks/useAuthSubmit";

const Registration = () => {
  const fields = [
    "first_name",
    "last_name",
    "email",
    "password",
    "address",
    "phone_number",
  ];
  const [user, handleChange] = useStatefulFields();
  const [errors, handleSubmit] = useAuthSubmit(
    "/api/users",
    user,
    fields,
    "/fundings/new"
  );

  return (
    <React.Fragment>
      <div style={{ borderTop: "2px solid #ADADAD" }}></div>
      <div className="authentication-form">
        <h2>Create an account</h2>
        <p>Setup a new account in a minute.</p>

        <form onSubmit={handleSubmit}>
          {errors.api && <p>something went wrong!</p>}
          <div className="flex">
            <div className="input-group">
              <label htmlFor="first_name">First Name </label>
              <input
                onChange={handleChange}
                type="text"
                name="first_name"
                placeholder="First Name*"
              />
              <span className="input-error">{errors.first_name}</span>
            </div>
            <div className="input-group">
              <label htmlFor="last">Last Name </label>
              <input
                onChange={handleChange}
                type="text"
                name="last_name"
                placeholder="Last name*"
              />
              <span className="input-error">{errors.last_name}</span>
            </div>
          </div>

          <div className="flex">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email Address*"
              />
              <span className="input-error">{errors.email}</span>
            </div>
            <div className="input-group">
              <label htmlFor="phone_number">phone Number </label>
              <input
                onChange={handleChange}
                type="number"
                name="phone_number"
                placeholder="Enter Phone NUmber*"
              />
              <span className="input-error">{errors.phone_number}</span>
            </div>
          </div>

          <div className="flex">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="text"
                name="password"
                placeholder="Enter Password*"
              />
              <span className="input-error">{errors.password}</span>
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                onChange={handleChange}
                type="text"
                name="password"
                placeholder="Confirm Password*"
              />
              <span className="input-error">{errors.password}</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              onChange={handleChange}
              type="address"
              name="address"
              placeholder="Contact Address*"
            />
            <span className="input-error">{errors.address}</span>
          </div>
          <input type="submit" value="Register" className="auth-btn" />
        </form>
        {/* <p>
        Already have an account?
        <Link to="/login"> Log in here!</Link>
      </p> */}
      </div>
    </React.Fragment>
  );
};

export default Registration;
