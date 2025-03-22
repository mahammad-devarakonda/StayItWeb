import React, { useEffect, useState } from 'react';
import { MessageCircle } from "lucide-react";
import { createSocketConnection } from '../utills';
import useMyConnections from '../Hooks/useMyConnections';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Send } from 'lucide-react';
import useChat from "../Hooks/useChatMessages"

const Inbox = () => {
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);  // Store messages
    const { id, userName } = useSelector((state) => state.user);
    const { connections } = useMyConnections(id);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        if (selectedChatUser) {
            const newSocket = createSocketConnection();
            setSocket(newSocket);

            newSocket.emit("joinChat", { userName, ChatUser: selectedChatUser.id, LoginUser: id });

            // Listen for messages
            newSocket.on("receiveMessage", (data) => {
                console.log("📩 New Message Received:", data);
                setMessages((prev) => [...prev, data]);
            });

            // Notify the server that the user is online
            newSocket.emit("userOnline", id);

            // Listen for user status updates
            if (socket) {
                socket.on("updateUserStatus", ({ userId, status }) => {
                    console.log(`🔄 Received status update: User ${userId} is now ${status}`);

                    connections((prevConnections) =>
                        prevConnections.map((user) =>
                            user.id === userId ? { ...user, status } : user
                        )
                    );
                });
            }

            return () => {
                console.log("🔴 Disconnecting socket");
                newSocket.disconnect();
            };
        }
    }, [selectedChatUser, id]);



    const handleMesgClick = (ChatUser) => {
        setSelectedChatUser(ChatUser);
        setMessages([]);
        navigate(`/inbox/${ChatUser.id}`);
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedChatUser && socket) {
            const roomId = [id, selectedChatUser.id].sort().join("_");
            const newMessage = { roomId, message, senderId: id, receiverId: selectedChatUser.id };

            socket.emit("sendMessage", newMessage, userName, id);
            setMessages((prev) => [...prev, { ...newMessage, senderId: id }]); // Add to local state
            setMessage("");
        }
    };

    return (
        <div className="w-full flex h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-white p-6 shadow-lg">
                <aside className="px-16">
                    <h1 className="text-xl font-semibold mb-4">Inbox</h1>
                    <div className="space-y-4">
                        {connections?.map((eachConnection) => (
                            <div
                                key={eachConnection.id}
                                className="flex flex-col bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                                onClick={() => handleMesgClick(eachConnection)}
                            >
                                <p className="font-semibold text-gray-800">{eachConnection.userName}</p>
                                <p className={`text-sm ${eachConnection.status === "online" ? "text-green-500" : "text-gray-500"}`}>
                                    {eachConnection.status === "online" ? "Online" : "Offline"}
                                </p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* Chat Section */}
            <div className="w-2/3 bg-white border-l border-gray-200 flex flex-col">
                {selectedChatUser ? (
                    <div className="flex flex-col h-full">
                        {/* Chat Header */}
                        <div className="flex items-center border-b border-gray-200 p-4 gap-4">
                            <img className='rounded-full w-10 h-10' src={selectedChatUser.avatar} alt={selectedChatUser.userName} />
                            <h2 className="text-lg font-semibold">{selectedChatUser.userName}</h2>
                        </div>

                        {/* Chat Messages Section */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-1 bg-gray-50">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex  ${msg.senderId === id ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[90%] rounded-l-4xl rounded-r-4xl px-6 py-1 ${msg.senderId === id ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-gray-800 "}`}>
                                        <p className="inline-block max-w-[75%]  text-sm">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Chat Input Section */}
                        <div className="border-t border-gray-200 p-4 flex items-center relative">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-3 pr-12 border border-gray-300 rounded-full focus:outline-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage} className="absolute right-6 bg-blue-500 text-white px-4 py-2 rounded-full">
                                <Send />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <MessageCircle className="w-28 h-28 text-gray-400" />
                        <h1 className="text-lg font-semibold mt-4">Your messages</h1>
                        <p>Click on a user to start a chat.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
