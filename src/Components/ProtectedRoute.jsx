import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth)
  const isAuthenticated = !!token

  const location = useLocation()

  const [isCollapsed, setIsCollapsed] = useState(


    sessionStorage.getItem("isCollapsed") === "true"
  );

 
  useEffect(() => {
    if (location.pathname === "/inbox" || "/inbox/:id") {
      setIsCollapsed(true);
    }else{
      setIsCollapsed(false);
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
