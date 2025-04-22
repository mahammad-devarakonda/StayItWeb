import { useQuery, gql } from "@apollo/client";

const GET_FEED = gql`
query getFeed {
  feed {
    id
    userName
    avatar
    bio
    connectionStatus
    posts {
      id
      content
      imageURL
    }
  }
}

`;

const useFeed = () => {
  const { loading, error, data } = useQuery(GET_FEED);
  return { loading, error, feed: data?.feed };
};

export default useFeed;
