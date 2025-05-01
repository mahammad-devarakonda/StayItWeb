import React, { useState } from "react";
import useAddPost from "../Hooks/useUploadImage";

const AddPost = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");
    const { uploadPost, loading, error, data } = useAddPost();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
            await uploadPost(file, content);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4 mt-10"
        >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Create a New Post
            </h2>

            <div>
                <label className="block text-gray-600 font-medium mb-1">Upload Image</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                />
                {file && (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-30 object-contain rounded-lg mt-2"
                    />
                )}

            </div>

            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write something about the post..."
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                {loading ? "Uploading..." : "Upload Post"}
            </button>

            {error && (
                <p className="text-red-600 text-sm text-center">Error: {error.message}</p>
            )}
            {data && (
                <p className="text-green-600 text-sm text-center">
                    {data.addPost.message}
                </p>
            )}
        </form>

    );
};

export default AddPost;
