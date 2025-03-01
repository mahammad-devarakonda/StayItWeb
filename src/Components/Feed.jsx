import React, { useState } from "react";
import Navbar from "./Navbar";
import UserFeed from "./UserFeed";

const Feed = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex w-full h-screen">
      <div
        className="md:flex hidden h-full text-center bg-gray-100 transition-all duration-300"
      >
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

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
