import React, { useState, useEffect } from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  
  const isAuthenticated = !!token;

  console.log(isAuthenticated);
  
  const location=useLocation()

  const [isCollapsed, setIsCollapsed] = useState(

    
    sessionStorage.getItem("isCollapsed") === "true"
  );

  useEffect(() => {
    if (location.pathname === "/inbox") {
      setIsCollapsed(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    sessionStorage.setItem("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  return isAuthenticated ? (
    <div>
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
