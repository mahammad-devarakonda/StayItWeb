import { useQuery, gql } from "@apollo/client";

const GET_MY_CONNECTIONS = gql`
  query MyConnections {
    MyConnections {
      id
      userName
      email
      avatar
      bio
    }
  }
`;

const useMyConnections = () => {
  const { loading, error, data } = useQuery(GET_MY_CONNECTIONS);

  return { loading, error, connections: data?.MyConnections };
};

export default useMyConnections;
