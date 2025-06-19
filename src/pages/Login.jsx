// Frontend: src/pages/Register.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";

import { notifySuccess, notifyError } from "../utils/toastify.js";
import { validateLoginForm } from "../utils/formValidation.js";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    // Setting errors state
    const error = validateLoginForm(form);
    if (error.email || error.password) {
      setError(error);
    } else {
      try {
        fetch("http://localhost:5000/api/auth/login", {
          method: "POST", // Specifies the request method
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Sets the content type header
          },
          body: JSON.stringify(form), // The payload that gets sent
        })
          .then((response) => {
            return response
              .json()
              .then((payload) => ({ status: response.status, payload }));
          })
          .then(({ payload, status }) => {
            if (status === 200) {
              notifySuccess(payload.msg);
              localStorage.setItem("user", JSON.stringify(payload.user));
              navigate("/dashboard");
            } else {
              notifyError(payload.msg);
              setForm({
                email: "",
                password: "",
              });
            }
          })
          .catch((error) => {
            console.error("Error with POST request:", error);
            notifyError(error.message);
          });
      } catch (error) {
        console.error(error.message);
        notifyError(error.message);
      }
    }
  };

  return (
    <div id="register-page">
      <div className="min-h-screen bg-gradient-to-b from-teal-200 to-teal-300 flex items-center justify-center">
        <div className="relative w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg">
          {/* Tab */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-400 px-6 py-2 rounded-full text-gray-900 font-semibold">
            LOGIN IN
          </div>
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="text-gray-400" size={32} />
            </div>
          </div>
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                className="w-full bg-gray-700 placeholder-gray-500 text-white py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
              />
            </div>
            {error.email && <p className="text-red-400">{error.email}</p>}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                className="w-full bg-gray-700 placeholder-gray-500 text-white py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />
            </div>
            {/* Options */}
            <div className="flex justify-between text-sm text-gray-400">
              <p>
                <Link to="/register">Do you not have an account yet?</Link>
              </p>
            </div>
            {error.password && <p className="text-red-400">{error.password}</p>}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-teal-400 text-gray-900 font-semibold py-2 rounded-md hover:shadow-md transition-shadow"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
