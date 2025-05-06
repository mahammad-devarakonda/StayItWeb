import { useQuery, gql } from "@apollo/client";
import UserProfile from "../Components/UserProfile";

const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID, $email: String) {
    user(id: $id, email: $email) {
      user {
        id
        userName
        email
        avatar
        bio
      }
      posts {
        id
        content
        imageURL
      }
      connection
    }
  }
`;


const useUserProfile = ({ id, email }) => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id, email },
    skip: !(id || email),
  });


  return {
    loading,
    error,
    userProfile:data
  };
};

export default useUserProfile;
