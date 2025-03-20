import React, { useEffect } from 'react'
import {MessageCircle} from "lucide-react"
import { createSocketConnection } from '../utills'

const Inbox = () => {

    useEffect(()=>{
        const socket=createSocketConnection
        
    },[])

    return (
        <div className="w-full flex">
            <div className="w-1/3 bg-white h-screen p-6 shadow-lg">
                <aside className='px-14'>
                    <h1 className="text-xl font-semibold mb-4">Inbox</h1>
                    <div className="space-y-4 cursor-pointer">
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition"
                                >
                                    <p className="font-semibold text-gray-800">Mahammad</p>
                                    <p className="text-gray-600">You can message now</p>
                                </div>
                            ))}
                    </div>
                </aside>
            </div>
            <div className="w-2/3 bg-white h-screen border-l border-r shadow-lg flex items-center flex-col justify-center">
                <MessageCircle className="w-28 h-28 flex-shrink-0 cursor-pointer" />
                <h1>Your messages</h1>
                <p>Send a message to start a chat.</p>
            </div>
        </div>
    )
}

export default Inbox