import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ user, onFollowClick, onImageClick, isRequested,handleLikeClick ,likedPosts}) => {
  
  const isDisabled =
    user.connectionStatus === "interested" ||
    user.connectionStatus === "accepted" ||
    isRequested;

  const getButtonLabel = () => {
    if (user.connectionStatus === "accepted") return "Friends";
    if (user.connectionStatus === "interested" || isRequested) return "Requested";
    return "Follow";
  };

  const getButtonClass = () => {
    if (user.connectionStatus === "accepted") return "bg-green-500 text-white cursor-default";
    if (user.connectionStatus === "interested" || isRequested) return "bg-gray-200 text-gray-500 cursor-not-allowed";
    return "text-blue-500 hover:bg-blue-100";
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden mb-6 border border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link
            to={`/userprofile/${user.id}`}
            className="hover:opacity-90 transition-opacity"
          >
            <img
              className="rounded-full w-12 h-12 object-cover border border-gray-50"
              src={user.avatar}
              alt={`${user.userName} avatar`}
            />
          </Link>
          <p className="text-base font-semibold text-gray-800">
            <Link
              to={`/userprofile/${user.id}`}
              className="hover:underline"
            >
              {user.userName}
            </Link>
          </p>
        </div>

        <button
          className={`text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 border ${getButtonClass()} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
            }`}
          onClick={() => onFollowClick(user.id)}
          disabled={isDisabled}
        >
          {getButtonLabel()}
        </button>
      </div>

      {user?.posts?.[0]?.imageURL ? (
        <img
          src={user.posts[0].imageURL}
          alt="User Post"
          className="w-full h-[450px] object-cover"
        />
      ) : (
        <div className="w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 text-sm italic">
          No post available
        </div>
      )}

      {user?.posts?.[0] && (
        <>
          <div className="px-4 mt-4 flex gap-5">
            <Heart
              role="button"
              aria-label="Like"
              className={`cursor-pointer w-6 h-6 transition ${likedPosts[user.posts[0].id]
                  ? "text-red-500 fill-current"
                  : "text-gray-600 hover:text-red-500"
                }`}
              onClick={() => handleLikeClick(user.posts[0].id)}
            />
            <MessageCircle
              role="button"
              aria-label="Comment"
              className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-500 transition"
              onClick={() => onImageClick(user.posts[0].imageURL, user)}
            />
          </div>

          <div className="px-4 py-3 text-gray-700 text-sm leading-relaxed">
            <span className="font-semibold text-gray-900 mr-1">{user.userName}</span>
            {user.posts[0].content}
          </div>
        </>
      )}
    </div>

  );
};

export default PostCard;
