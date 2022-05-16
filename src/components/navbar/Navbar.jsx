import React from "react";
import { NavLink } from "react-bootstrap";

// import { Badge } from "react-bootstrap";
import "./navbar.css";
import links from "./navlinks";

function Navbar() {
  return (
    <div className="m-navbar-wrapper">
      {links.map((link) => (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={link.path}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Navbar;
