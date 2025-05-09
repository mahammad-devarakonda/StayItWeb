import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatWindow = ({ selectedChatUser, messages, id, message, setMessage, handleSendMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full h-full bg-white border-l border-gray-200 flex flex-col">
            {selectedChatUser ? (
                <div className="flex flex-col h-full">
                    <div className="w-full flex items-center border-b border-gray-200 p-4 gap-4 bg-white sticky top-0 z-10 shadow-sm">
                        <img className="rounded-full w-12 h-12 object-cover" src={selectedChatUser?.avatar} alt={selectedChatUser?.userName} />
                        <h2 className="text-lg font-semibold text-black">{selectedChatUser?.userName}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-20 bg-gray-50 space-y-4">
                        {messages?.length === 0 ? (
                            <p className="text-gray-500 text-center mt-10">No messages yet. Start the conversation!</p>
                        ) : (
                            messages?.map((msg, index) => (
                                <div key={index} className={`flex ${msg?.sender?.id === id ? "justify-end" : "justify-start"}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`max-w-[75%] px-5 py-3 rounded-2xl shadow text-sm leading-snug break-words whitespace-pre-wrap ${
                                            msg?.sender?.id === id
                                                ? "bg-blue-500 text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-900 rounded-bl-none"
                                        } hover:shadow-md transition-shadow duration-200`}
                                    >
                                        {msg?.message || msg.text}
                                    </motion.div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0 z-10">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-3 pr-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black shadow-sm transition"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendMessage}
                                className="absolute right-2 bg-blue-500 text-white p-2 rounded-full flex items-center justify-center shadow hover:bg-blue-600 transition"
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                    <MessageCircle className="w-24 h-24 text-gray-400 mb-6" />
                    <h1 className="text-2xl font-semibold text-gray-700">Your Messages</h1>
                    <p className="text-gray-500 mt-2">Select a user from the chat list to start a conversation.</p>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
