import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../Auth";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="funding-header">
      {open && (
        <span className="hamburger-menu close" onClick={handleClick}>
          &times;
        </span>
      )}
      {!open && (
        <span className="hamburger-menu close" onClick={handleClick}>
          &#9776;
        </span>
      )}
      <h3>EduFund</h3>
      <div className={`funding-header__menu${open ? " show" : ""}`}>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/fundings">
              Donate
            </NavLink>
          </li>
          <li className={` ${Auth.isLoggedIn ? "hidden" : ""}`}>
            <NavLink exact to="/register">
              Register
            </NavLink>
          </li>
          <li className={` ${Auth.isLoggedIn ? "hidden" : ""}`}>
            <NavLink exact to="/login">
              Login
            </NavLink>
          </li>
          <li className={` ${Auth.isLoggedIn ? "" : "hidden"}`}>
            <NavLink exact to="/fundings/new">
              New Funding Request
            </NavLink>
          </li>
          <li
            className={` ${Auth.isLoggedIn ? "" : "hidden"}`}
            onClick={() => {
              Auth.logout();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
