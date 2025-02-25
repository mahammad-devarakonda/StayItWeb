import React from "react";
import Navbar from "./Navbar";
import useUserProfile from "../Hooks/useUserProfile";
import { useParams, Link } from "react-router-dom";


const UserProfile = () => {

  const parms = useParams();
  const userID = parms?.id
  const { loading, error, userProfile } = useUserProfile(userID);

  const user = userProfile?.user
  const posts = userProfile?.posts
  console.log(posts);


  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Navbar: Sidebar on Large Screens, Footer on Small Screens */}
      <aside className="hidden md:block md:w-1/5 md:h-full bg-white shadow-md border-r">
        <Navbar />
      </aside>

      <main className="w-full md:w-4/5 h-full overflow-y-auto p-5 md:p-10 pb-20 md:pb-0">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12">
          <div className="relative mb-5 md:mb-0">
            <img
              className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover border border-gray-500"
              src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
              alt="Avatar"
            />
          </div>

          <div className="flex flex-col space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              <h1 className="text-black text-xl md:text-2xl font-semibold">
                {user?.userName}
              </h1>
              <Link
                to={`/inbox/${userID}`}
                state={{ user }}
                className="border border-gray-400 px-3 py-1 rounded-md font-semibold text-sm md:text-base"
              >
                Message
              </Link>
            </div>

            <div className="flex justify-center md:justify-start space-x-5 text-gray-700 text-sm md:text-lg">
              <p><span className="font-semibold">{posts.length}</span> Posts</p>
              <p><span className="font-semibold">4</span> Connections</p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-7 text-center md:text-left">
          <h2 className="text-black font-semibold">Cinema Shows</h2>
          <p className="text-gray-700 text-sm md:text-base">
            🎬 I am that 'movie guy' in every friend group.
            <br /> 🎥 Cinema enthusiast? Follow
          </p>
        </div>

        <hr className="border-t border-gray-300 my-4 w-full" />

        {/* Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6 place-items-center">
          {posts?.length ? (
            posts.map((post) => (
              <img
                key={post.id}
                src={post.imageURL}
                alt="User Post"
                className="w-40 h-40 sm:w-56 sm:h-56 object-cover shadow-md"
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No posts available
            </p>
          )}
        </div>
      </main>
    </div>

  );
};

export default UserProfile;
