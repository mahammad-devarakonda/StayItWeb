import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import UserFeed from "./UserFeed";

const Feed = () => {

  const [isCollapsed, setIsCollapsed] = useState(
    sessionStorage.getItem("isCollapsed") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  return (
    <div className="flex w-full h-screen">
      <main
        className={`h-full overflow-y-auto transition-all duration-300 ${isCollapsed ? "w-[calc(100%-1px)]" : "w-[calc(100%-1px)]"
          }`}
      >
        <UserFeed />
      </main>

    </div>
  );
};

export default Feed;
