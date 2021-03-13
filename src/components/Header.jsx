import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div class="container">
        <Link class="navbar-brand" to="/">
          Personal Kanban Tool
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mobile-nav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <NavLink class="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <NavLink class="nav-link " to="/register">
                Sign Up
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
