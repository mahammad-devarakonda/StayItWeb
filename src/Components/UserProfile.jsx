import React from "react";
import Navbar from "./Navbar";
import useUserProfile from "../Hooks/useUserProfile";
import { useParams } from "react-router-dom";


const UserProfile = () => {

  const parms = useParams();
  const userID = parms?.id
  const { loading, error, userProfile } = useUserProfile(userID);

  const user=userProfile?.user
  const posts=userProfile?.posts

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-1/5 text-center shadow-md h-screen">
        <Navbar />
      </div>
      <div className="w-4/5 h-full overflow-y-auto p-10">
        <div className="flex flex-row items-center space-x-12">
          <div className="relative">
            <img
              className="rounded-full h-40 w-40 object-cover border-1 border-gray-500"
              src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
              alt="Avatar"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-black text-2xl font-semibold">
                {user?.userName}
              </h1>
            </div>

            <div className="flex space-x-5 text-gray-700 text-lg">
              <p><span className="font-semibold">288</span> posts</p>
              <p><span className="font-semibold">4</span> Connections</p>
            </div>
          </div>
        </div>


        <div className="mt-7">
          <h2 className="text-black font-semibold">cinema shows</h2>
          <p className="text-gray-700">
            🎬 I am that 'movie guy' in every friend group.
            <br /> 🎥 Cinema enthusiast? Follow
          </p>
        </div>

        <hr className="border-t-1 border-black my-4 w-full" />

        <div className="grid grid-cols-3 gap-4 p-6 place-items-center">
          {posts?.length ? (
            posts.map((post) => (
              <img
                key={post.id}
                src={post.imageURL}
                alt="User Post"
                className="w-56 h-56 object-cover"
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No posts available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
