import React, { useEffect, useState } from 'react'
import { MessageCircle } from "lucide-react"
import { createSocketConnection } from '../utills'
import useMyConnections from '../Hooks/useMyConnections'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Inbox = () => {

    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const { id } = useSelector((state) => state.user);
    const { loading: connectionsLoading, error: connectionsError, connections } = useMyConnections(id);
    console.log(connections);
    const navigate = useNavigate()

    useEffect(() => {
        if (selectedChatUser) {
            const socket = createSocketConnection();
            socket.emit("join", { ChatUser: selectedChatUser.id, id });
        }
    }, [selectedChatUser, id]);

    const handleMesgClick = (ChatUser) => {
        setSelectedChatUser(ChatUser)
        navigate(`/inbox/${ChatUser.id}`);
    }

    return (
        <div className="w-full flex">
            <div className="w-1/3 bg-white h-screen p-6 shadow-lg">
                <aside className='px-14'>
                    <h1 className="text-xl font-semibold mb-4">Inbox</h1>
                    <div className="space-y-4 cursor-pointer">
                        {connections?.map((eachConnection) => {
                            return (
                                <div
                                    className="flex flex-col bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition"
                                >
                                    <p onClick={() => { handleMesgClick(eachConnection) }} className="font-semibold text-gray-800">{eachConnection.userName}</p>
                                </div>
                            )
                        })}
                    </div>
                </aside>
            </div>
            <div className="w-2/3 bg-white h-screen border-l border-r shadow-lg flex items-center flex-col justify-center">
                {selectedChatUser ? (
                    <div className="w-full h-full p-6 flex flex-col">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-lg font-semibold">{selectedChatUser?.userName}</h2>
                        </div>

                        {/* Chat Messages Section */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                            {/* Dummy Messages */}
                            <div className="flex flex-col space-y-2">
                                {/* Receiver's Message */}
                                <div className="self-start max-w-[70%] bg-gray-200 p-3 rounded-lg">
                                    <p className="text-gray-800">Hey! How are you?</p>
                                    <span className="text-xs text-gray-500">10:15 AM</span>
                                </div>

                                {/* Sender's Message */}
                                <div className="self-end max-w-[70%] bg-blue-500 text-white p-3 rounded-lg">
                                    <p>I'm good! What about you?</p>
                                    <span className="text-xs text-gray-200">10:16 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat Input Section */}
                        <div className="border-t pt-2 flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-3 border border-gray-500 rounded-full focus:outline-none"
                            />
                            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
                        </div>
                    </div>

                ) : (
                    <div className="flex flex-col items-center">
                        <MessageCircle className="w-28 h-28 flex-shrink-0 cursor-pointer" />
                        <h1 className="text-lg font-semibold mt-4">Your messages</h1>
                        <p>Click on a user to start a chat.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Inbox