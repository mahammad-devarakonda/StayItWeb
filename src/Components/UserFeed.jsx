import React from "react";
import { Link } from "react-router-dom";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";

const UserFeed = () => {
  const { loading, error, feed } = useFeed();
  const { handleFollowRequest } = useFollowRequest();

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;


  return (
    <div className="flex flex-col items-center space-y-6 p-6 min-h-screen">
      {feed.map((user) => (
        <div key={user.id} className="w-[600px] bg-white rounded-lg overflow-hidden">
          <div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Link to={`/userprofile/${user.id}`}>
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="Avatar"
                  />
                </Link>
                <p className="text-lg font-semibold">
                  <Link to={`/userprofile/${user.id}`}>{user.userName}</Link>
                </p>

              </div>
              <button
                className="text-blue-500 font-medium"
                onClick={() => handleFollowRequest(user.id)}
              >
                Follow
              </button>
            </div>

            <div className="flex flex-col items-start">
              <img
                src={user?.posts[0]?.imageURL}
                alt="User Post"
                className="w-full h-[400px] object-contain"
              />
              <div className="flex flex-row items-start gap-1 py-10 text-left">
                <span className="font-medium">{user.userName}</span><p className="text-gray-700">{user?.posts[0]?.content}</p>
                
              </div>
            </div>
            <hr className="border-t-1 border-gray-300 my-2 w-full" />
          </div>
        </div>

      ))}

    </div>
  );
};

export default UserFeed;
