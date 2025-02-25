import React, { useState, useEffect } from 'react';
import useReviewRequest from '../Hooks/useReviewRequest';
import { useMutation, gql } from '@apollo/client';

const REVIEW_REQUEST_MUTATION = gql`
  mutation REVIEWREQUEST($requestedUser: ID!, $status: String!) {
    reviewRequestConnection(input: { requestedUser: $requestedUser, status: $status }) {
      success 
      message
      request {
        toUser {
          id
          userName
          email
        }
        status
        timestamp
      }
    }
  }
`;

const MyRequestList = () => {
  // Retrieve the list of connection requests from your custom hook
  const { data, loading, error } = useReviewRequest();
  // Maintain local state for the list so we can update it after mutation
  const [requests, setRequests] = useState([]);

  // Update local state once the data is fetched
  useEffect(() => {
    if (data?.myRequests) {
      setRequests(data.myRequests);
    }
  }, [data]);

  const [reviewRequest] = useMutation(REVIEW_REQUEST_MUTATION);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error.message}</p>;

  const handleAccept = async (userID) => {
    try {
      const { data: mutationData } = await reviewRequest({
        variables: {
          requestedUser: userID,
          status: "accepted",
        },
      });
      console.log("✅ Mutation Success:", mutationData);

      // Remove the accepted request from the local state list
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.fromUser.id !== userID)
      );
    } catch (error) {
      console.error("🚨 Mutation Failed:", error);
      if (error.networkError) {
        console.error("❌ Network Error:", error.networkError);
      }
      if (error.graphQLErrors) {
        console.error("🛑 GraphQL Errors:", error.graphQLErrors);
      }
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold mb-4">Connection Requests</h2>
      <ul className="space-y-3">
        {requests.length > 0 ? (
          requests.map((user) => (
            <li key={user.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full" src={user.profilePic} alt={user.name} />
                <p className="text-base font-medium">{user.fromUser.userName}</p>
              </div>
              <button
                onClick={() => handleAccept(user?.fromUser?.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
              >
                Accept
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No requests available</p>
        )}
      </ul>
    </div>
  );
};

export default MyRequestList;
