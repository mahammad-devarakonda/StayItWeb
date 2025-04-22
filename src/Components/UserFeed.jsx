import React, { useState } from "react";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";
import PostCard from "../Components/PostCard";
import Modal from "../Components/Modal";
import CommentSection from "../Components/CommentSection";

const UserFeed = () => {
  const { loading, error, feed } = useFeed();
  const { handleFollowRequest } = useFollowRequest();

  const [requestedIds, setRequestedIds] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const handleOpenImage = (imageURL, user) => {
    setData({ imageURL, user });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setData(null);
    setModalOpen(false);
  };

  const handleFollowClick = (id) => {
    const user = feed.find((u) => u.id === id);
    if (!user || user.connectionStatus === "interested" || user.connectionStatus === "accepted") {
      return; // Already requested or accepted
    }

    if (!requestedIds.includes(id)) {
      setRequestedIds((prev) => [...prev, id]);
      handleFollowRequest(id);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {feed.map((user) => (
        <PostCard
          key={user.id}
          user={user}
          onFollowClick={handleFollowClick}
          onImageClick={handleOpenImage}
          isRequested={requestedIds.includes(user.id)}
        />
      ))}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalClassName="w-[900px] h-[400px] rounded-md"
      >
        {data && (
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
            <div className="md:w-1/2 w-full">
              <img
                src={data.imageURL}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>
            <CommentSection username={data.user?.userName} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserFeed;
