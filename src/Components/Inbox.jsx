import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMyConnections from '../Hooks/useMyConnections';
import useChat from "../Hooks/useChatMessages";
import { createSocketConnection } from '../Utills/Socket';
import ChatWindow from './ChatWindow';

const Inbox = () => {
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [showChatOnly, setShowChatOnly] = useState(false);
    const { user: { userName, id } } = useSelector((state) => state.auth);
    const { connections } = useMyConnections(id);
    const { data } = useChat(selectedChatUser?.id);    
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userStatusMap, setUserStatusMap] = useState({});

    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    useEffect(() => {
        if (selectedChatUser) {
            const newSocket = createSocketConnection();
            setSocket(newSocket);

            newSocket.emit("joinChat", {
                userName,
                ChatUser: selectedChatUser.id,
                LoginUser: id
            });
            newSocket.emit("userOnline", id);

            newSocket.on("receiveMessage", (data) => {
                setMessages((prev) => [...prev, data]);
            });

            newSocket.on("updateUserStatus", ({ userId, status }) => {
                setUserStatusMap(prev => ({
                    ...prev,
                    [userId]: status
                }));
            });


            return () => {
                newSocket.disconnect();
            };
        }
    }, [selectedChatUser, id]);


    const handleMesgClick = (ChatUser) => {
        setSelectedChatUser(ChatUser);
        navigate(`/inbox/${ChatUser.id}`);
        setShowChatOnly(true); // Hide sidebar on mobile
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedChatUser && socket) {
            const roomId = [id, selectedChatUser.id].sort().join("_");
            const newMessage = {
                roomId,
                message,
                senderId: id,
                receiverId: selectedChatUser.id
            };

            setMessages((prev) => [...prev, {
                ...newMessage,
                sender: { id, userName }
            }]);

            setMessage("");
            socket.emit("sendMessage", newMessage);
        }
    };

    return (
        <div className="w-full h-screen p-4 text-white flex flex-col md:flex-row overflow-hidden">
            <div className={`w-full md:w-1/3 lg:w-1/4 overflow-y-auto pr-2 ${showChatOnly ? 'hidden md:block' : 'block'}`}>
                <div className="grid gap-4">
                    {connections?.map((eachConnection) => (
                        <div
                            key={eachConnection.id}
                            onClick={() => handleMesgClick(eachConnection)}
                            className="cursor-pointer p-4 bg-white rounded-xl shadow-md hover:bg-gray-100 transition duration-200"
                        >
                            <p className="font-semibold text-gray-800 text-lg">{eachConnection.userName}</p>
                            <p className={`text-sm ${userStatusMap[eachConnection.id] === "online" ? "text-green-500" : "text-gray-500"}`}>
                                {userStatusMap[eachConnection.id] === "online" ? "Online" : "Offline"}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`w-full md:w-2/3 lg:w-3/4 ${selectedChatUser ? "block" : "hidden"} md:block overflow-y-auto`}>
                <ChatWindow
                    selectedChatUser={selectedChatUser}
                    messages={messages?.message}
                    setMessages={setMessages}
                    socket={socket}
                    id={id}
                    userName={userName}
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Inbox;
