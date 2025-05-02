import React, { useState, useEffect } from "react";
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

  const [isCollapsed, setIsCollapsed] = useState(
    sessionStorage.getItem("isCollapsed") === "true"
  );

  useEffect(() => {
    if (location.pathname.startsWith("/inbox")) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? (
    <div>
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="lg:ml-16">
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet /> // allow access to "/" (e.g., login page)
  );
};

export default ProtectedRoute;
