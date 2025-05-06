import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3001/check-auth", {
      credentials: "include", // 👈 sends HttpOnly cookie
    })
      .then((res) => {
        setIsAuthenticated(res.status === 200);
      })
      .catch(() => setIsAuthenticated(false));
  }, [location.pathname]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  // Redirect logic
  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? (
    <div>
      <Navbar />
      <div className="lg:ml-16">
        <Outlet />
      </div>
    </div>
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
