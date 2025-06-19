import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Navbar from './Navbar.jsx';
import Dashboard from "../pages/Dashboard.jsx";
import PrivateRoute from "../utils/PrivateRoute";

export default function App() {
  return (
    <div>
      {/* ToastContainer should be rendered once in your app */}
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
