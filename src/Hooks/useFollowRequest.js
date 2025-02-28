import { useMutation, gql } from "@apollo/client";

const SEND_REQUEST = gql`
  mutation SENDREQUEST($toUser: String!, $status: String!) {
    sendRequestConnection(input: { toUser: $toUser, status: $status }) {
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
`;

const useFollowRequest = () => {
  const [sendRequest] = useMutation(SEND_REQUEST);

  const handleFollowRequest = async (id) => {
    try {
      const { data } = await sendRequest({
        variables: {
          toUser: id,
          status: "interested",
        },
      });
      
      alert(`Follow request sent to ${id}`);
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request");
    }
  };

  return { handleFollowRequest };
};

export default useFollowRequest;
