import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUserProfile from "../Hooks/useUserProfile";
import useMyConnections from "../Hooks/useMyConnections";
import Modal from "./Modal";
import { useSelector } from "react-redux"
import ProfileHeader from "./ProfileHeader";
import PostsGrid from "./PostsGrid";

const UserProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConnections, setShowConnections] = useState(false);
  const authData = useSelector((state) => state.auth)

  const [isCollapsed, setIsCollapsed] = useState(
    sessionStorage.getItem("isCollapsed") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  const { id: userID } = useParams();
  const { loading, error, userProfile } = useUserProfile(userID);
  const { loading: connectionsLoading, error: connectionsError, connections } = useMyConnections(userID);

  const user = userProfile?.user?.user
  const posts = userProfile?.user?.posts || []
  const loggedInUser = authData?.user
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

  const handleShowConnections = () => {
    setShowConnections(true);
  };

  const handleCloseConnections = () => {
    setShowConnections(false);
  };

  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-6 overflow-y-auto min-w-0 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <ProfileHeader
              user={user}
              postsCount={posts.length}
              connectionCount={userProfile?.user?.connection}
              loggedInUser={loggedInUser}
              userID={userID}
              onShowConnections={() => setShowConnections(true)}
            />
          </div>

          {/* Bio */}
          <div className="mt-7 text-center md:text-left">
            <p className="text-gray-700 text-sm md:text-base mt-1">
              {user?.bio}
            </p>
          </div>

          <hr className="border-t border-gray-300 my-6 w-full" />

          {/* Grid Layout for Posts */}
          <PostsGrid posts={posts} onImageClick={handleOpenImage}/>
        </div>

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

        <Modal isOpen={showConnections} onClose={handleCloseConnections} modalClassName="w-[300px] h-auto rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Connections</h2>
          {connectionsLoading ? (
            <p>Loading...</p>
          ) : connectionsError ? (
            <p className="text-red-500">{connectionsError.message}</p>
          ) : connections?.length ? (
            <ul className="space-y-2">
              {connections.map((connection) => (
                <li key={connection.id} className="flex items-center space-x-3">
                  <img src={connection.avatar} alt={connection.userName} className="w-10 h-10 rounded-full" />
                  <p className="text-gray-700 font-medium">{connection.userName}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No connections available</p>
          )}
        </Modal>


      </main>

    </div>

  );
};

export default UserProfile;
