import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatWindow = ({ selectedChatUser, messages, id, message, setMessage, handleSendMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full bg-white border-l border-gray-200 flex flex-col">
            {selectedChatUser ? (
                <div className="flex flex-col h-full">
                    {/* Header Section */}
                    <div className="w-full flex items-center border-b border-gray-200 p-4 gap-4 bg-white z-10 fixed ">
                        <img className="rounded-full w-10 h-10" src={selectedChatUser?.avatar} alt={selectedChatUser?.userName} />
                        <h2 className="text-lg font-semibold text-black">{selectedChatUser?.userName}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-14 space-y-2 bg-gray-50">
                        {messages?.length === 0 ? (
                            <p className="text-black text-center">No messages yet.</p>
                        ) : (
                            messages?.map((msg, index) => (
                                <div key={index} className={`flex flex-col ${msg?.sender?.id === id ? "items-end" : "items-start"}`}>
                                    {/* Message Bubble */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${msg?.sender?.id === id ? "justify-end text-right" : "text-left justify-start"}`}
                                    >
                                        <div
                                            className={`inline-block px-5 py-3 mt-6 rounded-2xl shadow 
    ${msg?.sender?.id === id
                                                    ? "bg-blue-500 text-white ml-auto rounded-br-none"
                                                    : "bg-gray-100 text-gray-900 mr-auto rounded-bl-none"
                                                }`}
                                            style={{
                                                maxWidth: '85%',
                                                wordBreak: 'break-word',
                                                minWidth: '150px',
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            <p className="text-sm leading-snug">{msg?.message || msg.text}</p>
                                        </div>


                                    </motion.div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Section */}
                    <div className="border-t border-gray-200 p-4 flex items-center relative bg-white z-10">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 p-3 pr-12 border border-gray-300 rounded-full focus:outline-none text-black"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSendMessage}
                            className="absolute right-6 bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                            <Send />
                        </motion.button>
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
    );
};

export default ChatWindow;
