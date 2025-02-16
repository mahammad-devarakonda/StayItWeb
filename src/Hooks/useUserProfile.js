import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      user {
        id
        userName
        email
      }
      posts {
        id
        content
        description
        imageURL
      }
    }
  }
`;

const useUserProfile = (id) => {
  console.log(id);
  
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id }
  });


  console.log(data?.user);
  

  return { loading, error, userProfile: data?.user };


  
};

export default useUserProfile;
