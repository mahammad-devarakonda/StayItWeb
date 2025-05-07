import React, { useEffect, useState } from "react";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";
import PostCard from "../Components/PostCard";
import Modal from "../Components/Modal";
import CommentSection from "../Components/CommentSection";
import { useNavigate } from "react-router-dom";

const UserFeed = () => {
    const { loading, error, feed, loadMore, loadingMore, hasMore } = useFeed();
    const { handleFollowRequest } = useFollowRequest();

    const [requestedIds, setRequestedIds] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            navigate('/');
        }
    }, [error, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loadingMore &&
                hasMore
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore, loadingMore, hasMore]);

    const handleOpenImage = (imageURL, user) => {
        setData({ imageURL, user });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setData(null);
        setModalOpen(false);
    };

    const handleFollowClick = (id) => {
        const user = feed.find((u) => u.id === id);
        if (!user || user.connectionStatus === "interested" || user.connectionStatus === "accepted") {
            return;
        }
        if (!requestedIds.includes(id)) {
            setRequestedIds((prev) => [...prev, id]);
            handleFollowRequest(id);
        }
    };

    if (loading && feed.length === 0) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center p-4 min-h-screen mt-20">
            {feed.map((user) => (
                <PostCard
                    key={user.id}
                    user={user}
                    onFollowClick={handleFollowClick}
                    onImageClick={handleOpenImage}
                    isRequested={requestedIds.includes(user.id)}
                />
            ))}

            <button
                onClick={loadMore}
                disabled={loadingMore || !hasMore}
                className={`mt-4 px-4 py-2 text-black rounded ${(!hasMore || loadingMore) && 'opacity-50 cursor-not-allowed'
                    }`}
            >
                {loadingMore ? 'Loading more...' : hasMore ? 'Load More' : 'No more posts'}
            </button>

            {!hasMore && (
                <p className="mt-4 text-gray-500">🎉 You have reached the end of the feed.</p>
            )}


            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalClassName="w-[900px] h-[400px] rounded-md"
            >
                {data && (
                    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
                        <div className="md:w-1/2 w-full">
                            <img
                                src={data.imageURL}
                                alt="Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CommentSection username={data.user?.userName} />
                    </div>
                )}
            </Modal>
        </div>
    );
};


export default UserFeed