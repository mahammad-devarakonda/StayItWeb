import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


const SEND_REQUEST=gql`
  mutation SENDREQUEST($toUser:String!,$status: String!){
    sendRequestConnection(input: {toUser: $toUser, status: $status }){
      success
        message
        request {
            toUser {
                userName
            }
            status
            timestamp
        }
    }
  }
`

const GET_FEED = gql`
  query GetFeed {
    feed {
      id
      userName
      posts {
        id
        content
        imageURL
      }
    }
  }
`;


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  autoplaySpeed: 5000,
};

const UserFeed = () => {
  const { loading, error, data } = useQuery(GET_FEED);

  const [sendRequest] = useMutation(SEND_REQUEST);

  const handleFollowRequest = async (id) => {
    try {
      const { data } = await sendRequest({
        variables: {
          toUser: id,
          status: "interested",
        },
      });
      console.log("Follow request sent:", data);
      alert(`Follow request sent to ${id}`);
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request");
    }
  };

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 min-h-screen">
      {data.feed.map((user) => (
        <div
          key={user.userName}
          className="w-[900px] bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4" >
              <Link to="/userprofile" >
                <img
                  className="rounded-full w-12 h-12 object-cover border"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Avatar"
                />
              </Link>
              <p className="text-lg font-semibold">{user.userName}</p>
            </div>
            <button className="text-blue-500 font-medium hover:underline" onClick={()=>handleFollowRequest(user.id)}>
              Follow
            </button>
          </div>

          <Slider {...sliderSettings} className="w-full">
            {user.posts.map((post) => (
              <div key={post.id} className="relative">
                <img
                  src={post.imageURL}
                  alt="User Post"
                  className="w-full h-[400px] object-contain"
                />
                {post.content && (
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
                    {post.content}
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default UserFeed;
