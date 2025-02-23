import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_IMAGE = gql`
  mutation UPLOADIMAGE($content: String!, $imageURL: String!) {
    addPost(input: { content: $content, imageURL: $imageURL }) {
      id
      content
      imageURL
    }
  }
`;

const useUploadImage = () => {
  
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadImage, { loading, error }] = useMutation(UPLOAD_IMAGE);

  const handleChange = async (e) => {

    e.preventDefault(); 

    if (!imageURL || !content) {
      console.error("Both content and imageURL are required!");
      return;
    }

    try {
      await uploadImage({
        variables: {
          content,
          imageURL,
        },
      });

      setContent("");
      setImageURL("");

    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return { content, setContent, imageURL, setImageURL,handleChange , loading, error };
};

export default useUploadImage;
