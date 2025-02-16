import React from "react";
import Navbar from "./Navbar";
import useUserPosts from "../Hooks/useUserPosts";

const UserProfile = () => {

  const { loading, error, data } =useUserPosts();

  const user=data?.UserPosts?.user
  const posts=data?.UserPosts?.posts
  
  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;


  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-1/5 text-center">
        <Navbar />
      </div>
      <div className="w-4/5 bg-amber-100 h-full overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6 gap-7">
          <div className="flex flex-row justify-evenly p-6 w-full">
            <div className="relative">
              <img
                className="rounded-full h-40 w-40 object-cover border-4 border-gray-500"
                src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                alt="Avatar"
              />
            </div>

            <div>
              <h1 className="text-black text-2xl font-semibold mt-4">
                {user?.userName || "User Name"}
              </h1>
              <p className="text-black mt-1">4 Connections</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <img
                  key={post.id}
                  src={post.imageURL || "https://via.placeholder.com/150"}
                  alt="Post"
                  className="w-80 h-80 object-cover rounded-md"
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
