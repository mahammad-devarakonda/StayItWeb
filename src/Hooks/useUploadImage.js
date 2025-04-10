import { useState } from "react";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

const ADD_POST_MUTATION = `
  mutation AddPost($file: Upload!, $content: String!) {
    addPost(file: $file, content: $content) {
      success
      message
      fileUrl
      fileDetails {
        id
        content
        imageURL
      }
    }
  }
`;

const useUploadImage = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !content) {
      console.error("Both content and file are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      
      const formData = new FormData();
      formData.append("operations", JSON.stringify({
        query: ADD_POST_MUTATION,
        variables: { file: null, content }
      }));
      formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
      formData.append("0", file);

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        },
      });

      const result = await response.json();
      if (result?.errors) {
        throw new Error(result.errors[0].message);
      }
      setContent("");
      setFile(null);
    } catch (err) {
      console.error("Upload Error:", err?.message);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    content,
    setContent,
    file,
    handleFileChange,
    handleUpload,
    loading,
    error
  };
};

export default useUploadImage;
