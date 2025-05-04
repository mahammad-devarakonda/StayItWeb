import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const isTokenValid = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (err) {
      return false;
    }
  };

  const isAuthenticated = isTokenValid();


  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? (
    <div>
      <Navbar/>
      <div className="lg:ml-16">
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet /> // allow access to "/" (e.g., login page)
  );
};

export default ProtectedRoute;
