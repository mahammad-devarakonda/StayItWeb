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
    const {data,loading,error}=useQuery(REVIEW_REQUEST)

    console.log(data);

    console.log("📡 Fetching Data...");
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);
    

    return {data,loading,error}
}

export default useReviewRequest