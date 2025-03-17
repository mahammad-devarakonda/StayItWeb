import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";
import { MessageCircle, Heart } from "lucide-react";
import Modal from "./Modal";

const UserFeed = () => {
  const { loading, error, feed } = useFeed();
  const { handleFollowRequest } = useFollowRequest();
  const [isModalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState(null)

  const handleOpenImage = (imageURL,user) => {
    setData({imageURL,user});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setData(null)
    setModalOpen(false)
  }

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error?.message}</p>;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {feed.map((user) => (
        <div
          key={user?.id}
          className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6"
        >
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

          <div className="px-4 mt-3 text-left flex flex-row gap-3">
            <Heart  />
            <MessageCircle onClick={() => handleOpenImage(user?.posts[0].imageURL ,user)} />
          </div>

          <div className="p-4 text-left">
            <p className="text-gray-700">
              <span className="font-semibold text-black">{user?.userName}</span> {user?.posts?.[0]?.content}
            </p>
          </div>

          <hr className="border-t border-gray-300" />
        </div>
      ))}
      <div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} modalClassName="w-[900px] h-[400px] rounded-md">
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
            <div className="md:w-1/2 w-full">
              <img src={data?.imageURL} alt="Image" className="w-full h-full object-cover" />
            </div>

            <div className="md:w-1/2 w-full p-6 flex flex-col">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold text-black">{data?.user?.userName}</span>
              </p>

              <div className="bg-gray-100 p-4 flex-1">
                <p className="font-semibold mb-2">Comments:</p>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  <p className="text-gray-600"><span className="font-semibold">fanboy_007:</span> Mass look as always! 🔥🔥</p>
                  <p className="text-gray-600"><span className="font-semibold">cinema_buff:</span> That sweater is a whole vibe! 🎨✨</p>
                  <p className="text-gray-600"><span className="font-semibold">nani_forever:</span> Waiting for your next movie update! 🎬❤️</p>
                  <p className="text-gray-600"><span className="font-semibold">dreamer_girl:</span> Smiling like the king you are! 👑💙</p>
                  <p className="text-gray-600"><span className="font-semibold">meme_lord:</span> When natural star meets natural beauty! 😍📸</p>
                  <p className="text-gray-600"><span className="font-semibold">vibe_check:</span> That background + your swag = Perfection! 😎🙌</p>
                  <p className="text-gray-600"><span className="font-semibold">movie_maniac:</span> Nani in March? Something exciting coming?? 👀🔥</p>
                  <p className="text-gray-600"><span className="font-semibold">lovefromkerala:</span> Malayali fans love you, Nani chetta! 💚💛</p>
                  <p className="text-gray-600"><span className="font-semibold">trend_setter:</span> Instagram's trending post alert 🚀💥</p>
                </div>
              </div>
            </div>
          </div>

        </Modal>
      </div>
    </div>
  );
};

export default UserFeed;
