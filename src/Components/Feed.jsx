import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import UserFeed from "./UserFeed";

const Feed = () => {

  return (
    <div className="flex w-full h-screen">
      <main className="flex justify-center items-center w-full h-full transition-all duration-300">
        <UserFeed />
      </main>

    </div>
  );
};

export default Feed;
