import { useQuery ,gql} from "@apollo/client";

const REVIEW_REQUEST = gql`
    query REVIEWREQUEST{
        myRequests {
        id
        fromUser {
            id
            userName
            email
        }
        toUser {
            id
            userName
            email
        }
        status

    }
    }
`;

const useReviewRequest=()=>{
    const {data,loding,error}=useQuery(REVIEW_REQUEST)

    return {data,loding,error}
}

export default useReviewRequest