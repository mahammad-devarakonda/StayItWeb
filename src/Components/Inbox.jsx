import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMyConnections from '../Hooks/useMyConnections';
import useChat from "../Hooks/useChatMessages";
import { createSocketConnection } from '../Utills/Socket';
import ChatWindow from './ChatWindow';
import { ArrowLeft } from 'lucide-react';

const Inbox = () => {
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [showChatOnly, setShowChatOnly] = useState(false);
    const { user: { userName, id } } = useSelector((state) => state.auth);
    const { connections } = useMyConnections(id);
    const { data } = useChat(selectedChatUser?.id);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userStatusMap, setUserStatusMap] = useState({});

    useEffect(() => {
        if (data?.chat) {
            setChatInfo(data.chat);
            setMessages(data.chat.message || []);
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
                setMessages((prev = []) => [...prev, data]);
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
        setShowChatOnly(true);
    };

    const onBack = () => {
        navigate('/feed')
    }

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
        <div className="w-full h-full text-white flex flex-col md:flex-row overflow-hidden">
            <div className={` mb-10 w-full md:w-1/3 lg:w-1/4 overflow-y-auto px-4 py-6 border-r border-gray-200 ${showChatOnly ? 'hidden md:block' : 'block'
                }`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
                        aria-label="Back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800 tracking-tight">{userName}'s Inbox</h2>
                </div>

                <div className="space-y-4">
                    {connections?.map((eachConnection) => (
                        <div
                            key={eachConnection.id}
                            onClick={() => handleMesgClick(eachConnection)}
                            className="cursor-pointer p-4 bg-white rounded-xl shadow hover:bg-gray-50 transition duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={eachConnection.avatar}
                                    alt={eachConnection.userName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{eachConnection.userName}</p>
                                    <p className={`text-sm ${userStatusMap[eachConnection.id] === "online" ? "text-green-500" : "text-gray-500"}`}>
                                        {userStatusMap[eachConnection.id] === "online" ? "Online" : "Offline"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`w-full md:w-2/3 lg:w-3/4 ${selectedChatUser ? "block" : "hidden"} md:block`}>
                <ChatWindow
                    selectedChatUser={selectedChatUser}
                    messages={messages}
                    setMessages={setMessages}
                    socket={socket}
                    id={id}
                    userName={userName}
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                    userStatusMap={userStatusMap}
                    onBack={() => {
                        setSelectedChatUser(null);
                        setShowChatOnly(false);
                        navigate("/inbox");
                    }}
                />
            </div>
        </div>
    );
};

export default Inbox;
