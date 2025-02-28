import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Chatting() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const user = location.state?.user;



  const sendMessage = () => {
    if (input.trim() && selectedUser) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen">

      <div className="w-3/4 mx-auto flex flex-col p-4">
            <h2 className="text-xl font-bold mb-4">{user?.userName}</h2>
            <div className="flex-1 border p-4 mb-4 h-96 overflow-y-auto">
              {messages.map((msg, index) => (
                <p key={index} className="mb-2">
                  <strong>{msg?.sender}: </strong> {msg.text}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="border p-2 flex-1 rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>
                Send
              </button>
            </div>
      </div>
    </div>
  );
}