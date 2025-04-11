import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ user, onFollowClick, onImageClick, isRequested }) => {
  const isDisabled =
    user.connectionStatus === "interested" ||
    user.connectionStatus === "accepted" ||
    isRequested;

  const getButtonLabel = () => {
    if (user.connectionStatus === "accepted") return "Friends";
    if (isRequested) return "Requested";
    return "Follow";
  };

  const getButtonClass = () => {
    if (user.connectionStatus === "accepted") return "bg-green-500 text-white cursor-default";
    if (isRequested) return "bg-gray-200 text-gray-500 cursor-not-allowed";
    return "text-blue-500 hover:bg-blue-100";
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link to={`/userprofile/${user.id}`} className="hover:opacity-80 transition">
            <img
              className="rounded-full w-12 h-12 object-cover border border-gray-300"
              src={user.avatar}
              alt={`${user.userName} avatar`}
            />
          </Link>
          <p className="text-base font-semibold">
            <Link to={`/userprofile/${user.id}`} className="hover:underline">
              {user.userName}
            </Link>
          </p>
        </div>

        <button
          disabled={isDisabled}
          className={`text-sm px-4 py-2 rounded-md transition ${getButtonClass()}`}
          onClick={() => onFollowClick(user.id)}
        >
          {getButtonLabel()}
        </button>
      </div>

      {user?.posts?.[0]?.imageURL && (
        <img
          src={user.posts[0].imageURL}
          alt="User Post"
          className="w-full h-[450px] object-cover"
        />
      )}

      <div className="px-4 mt-3 text-left flex flex-row gap-3">
        <Heart />
        <MessageCircle onClick={() => onImageClick(user.posts[0].imageURL, user)} />
      </div>

      <div className="p-4 text-left">
        <p className="text-gray-700">
          <span className="font-semibold text-black">{user.userName}</span>{" "}
          {user.posts?.[0]?.content}
        </p>
      </div>

      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PostCard;
