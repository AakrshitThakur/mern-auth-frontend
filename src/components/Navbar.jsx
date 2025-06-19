// Frontend: src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { notifySuccess, notifyError } from "../utils/toastify";

function Navbar() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("user");

  const handleLogout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response
          .json()
          .then((payload) => ({ payload, status: response.status }));
      })
      .then(({ payload, status }) => {
        if (status === 200) {
          localStorage.removeItem("user");
          notifySuccess(payload.msg);
          navigate("/login");
        } else if (status === 400) {
          notifyError(payload.msg);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <nav
      style={{
        padding: "1em",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "1em" }}>
          Dashboard
        </Link>
        {!jwtToken && (
          <Link to="/register" style={{ marginRight: "1em" }}>
            Register
          </Link>
        )}
        {!jwtToken && <Link to="/login">Login</Link>}
      </div>
      {jwtToken && <button className="cursor-pointer" onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
