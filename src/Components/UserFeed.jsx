import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";

const UserFeed = () => {
  const { loading, error, feed } = useFeed();
  const { handleFollowRequest } = useFollowRequest();

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error?.message}</p>;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {feed.map((user) => (
        <div 
          key={user?.id} 
          className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6"
        >
          {/* User Info & Follow Button */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Link to={`/userprofile/${user?.id}`} className="hover:opacity-80 transition">
                <img
                  className="rounded-full w-12 h-12 object-cover border border-gray-300"
                  src={user?.avatar}
                  alt={`${user?.userName} avatar`}
                />
              </Link>
              <p className="text-base font-semibold">
                <Link to={`/userprofile/${user?.id}`} className="hover:underline">
                  {user?.userName}
                </Link>
              </p>
            </div>
            <button
              className="text-blue-500 text-sm px-4 py-2 rounded-md transition cursor-pointer"
              onClick={() => handleFollowRequest(user?.id)}
            >
              Follow
            </button>
          </div>

          {user?.posts[0]?.imageURL && (
            <img
              src={user?.posts[0]?.imageURL}
              alt="User Post"
              className="w-full h-[450px] object-cover"
            />
          )}

          <div className="p-4 text-left">
            <p className="text-gray-700">
              <span className="font-semibold text-black">{user?.userName}</span> {user?.posts?.[0]?.content}
            </p>
          </div>

          <hr className="border-t border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default UserFeed;
