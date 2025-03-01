import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import useUserProfile from "../Hooks/useUserProfile";
import Modal from "./Modal";

const UserProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { id: userID } = useParams();
  const { loading, error, userProfile } = useUserProfile(userID);
  const user = userProfile?.user;
  const posts = userProfile?.posts || []

  const loggedInUserID = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(loggedInUserID);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error?.message}</p>;

  const handleOpenImage = (imageURL, content) => {
    setSelectedImage({ imageURL, content });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className="flex w-full h-screen">
      <aside className={`h-full bg-gray-100 transition-all duration-300 border-r border-gray-300 ${isCollapsed ? "w-16" : "w-60"}`}>
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </aside>


      <main className="flex-1 p-6 overflow-y-auto min-w-0 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            {/* Profile Image */}
            <div className="relative mb-5 md:mb-0">
              <img
                className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover border border-gray-300 shadow-md"
                src={user?.avatar}
                alt={`${user?.userName} avatar`}
              />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <h1 className="text-black text-xl md:text-2xl font-semibold">{user?.userName}</h1>
                {parsedUser.id !== userID && (
                  <Link
                    to={`/inbox/${userID}`}
                    state={{ user }}
                    className="border border-gray-400 px-4 py-2 rounded-md font-semibold text-sm md:text-base transition hover:bg-gray-200"
                  >
                    Message
                  </Link>
                )}
              </div>

              {/* Post & Connections Count */}
              <div className="flex justify-center md:justify-start space-x-6 text-gray-700 text-sm md:text-lg">
                <p><span className="font-semibold">{posts.length}</span> Posts</p>
                <p><span className="font-semibold">4</span> Connections</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-7 text-center md:text-left">
            <h2 className="text-black font-semibold text-lg">Cinema Enthusiast 🎬</h2>
            <p className="text-gray-700 text-sm md:text-base mt-1">
              I am that 'movie guy' in every friend group. <br /> 🎥 Love cinema? Follow for more!
            </p>
          </div>

          <hr className="border-t border-gray-300 my-6 w-full" />

          {/* Grid Layout for Posts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
            {posts.length ? (
              posts.map((post) => (
                <img
                  key={post?.id}
                  src={post?.imageURL}
                  alt="User Post"
                  className="w-full h-40 sm:h-56 object-cover rounded-md shadow-md cursor-pointer transition-transform"
                  onClick={() => handleOpenImage(post?.imageURL, post?.content)}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">No posts available</p>
            )}
          </div>
        </div>

        {/* Modal for Enlarged Image */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalClassName="w-[600px] h-auto rounded-lg p-6">
          {selectedImage && (
            <div className="flex flex-col p-2">
              <img
                src={selectedImage.imageURL}
                alt="Selected Post"
                className="w-full h-auto"
              />
              <p className="text-gray-800 mt-2">{selectedImage.content}</p>
            </div>
          )}
        </Modal>
      </main>

    </div>

  );
};

export default UserProfile;
