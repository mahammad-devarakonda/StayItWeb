import React, { useEffect, useState } from 'react';
import { MessageCircle, Send } from "lucide-react";
import { createSocketConnection } from '../Utills/Socket';
import useMyConnections from '../Hooks/useMyConnections';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useChat from "../Hooks/useChatMessages";
import ChatWindow from './ChatWindow';


const Inbox = () => {
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [message, setMessage] = useState("");
    const { user:{userName,id} } = useSelector((state) => state.auth);
    const { connections } = useMyConnections(id);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const { data } = useChat(selectedChatUser?.id);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (data && selectedChatUser) {
            setMessages(data?.chat?.message);
        }
    }, [data, selectedChatUser]);

    useEffect(() => {
        if (selectedChatUser) {
            const newSocket = createSocketConnection();
            setSocket(newSocket);

            newSocket.emit("joinChat", { userName, ChatUser: selectedChatUser.id, LoginUser: id });
            newSocket.on("receiveMessage", (data) => {
                setMessages((prev) => [...prev, data]);
            });

            return () => {
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
            const roomId = [id, selectedChatUser.id].sort().join("_"); // Ensure same sorting as backend
            const newMessage = {
                roomId,
                message,
                senderId: id, // Ensure senderId is a direct value
                receiverId: selectedChatUser.id
            };

            // 1️⃣ Immediately update UI with sender object for consistency
            setMessages((prev) => [...prev, { ...newMessage, sender: { id, userName } }]);

            // 2️⃣ Clear input field
            setMessage("");

            // 3️⃣ Send message to backend
            socket.emit("sendMessage", newMessage);
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

            {/* Chat Window */}
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
            />
        </div>
    );
};

export default Inbox;
