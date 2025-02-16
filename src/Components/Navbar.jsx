import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, MessageCircle, Heart, PlusCircle } from "lucide-react";

const Navbar = () => {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed flex flex-col justify-between">

            <div className="p-6">
                <h1 className="text-2xl font-medium font-serif italic text-left tracking-widest">StayIt</h1>
            </div>

            <nav className="flex flex-col justify-between h-full">
                <div>
                    <ul className="space-y-6 px-6 text-lg">
                        <li className="flex items-center space-x-4">
                            <Home className="w-6 h-6" />
                            <Link to="/feed" className="font-semibold">Home</Link>
                        </li>

                        <li className="flex items-center space-x-4">
                            <Compass className="w-6 h-6" />
                            <Link to="/explore">Explore</Link>
                        </li>

                        <li className="flex items-center space-x-4">
                            <MessageCircle className="w-6 h-6 relative">
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">5</span>
                            </MessageCircle>
                            <Link to="/messages">Messages</Link>
                        </li>

                        <li className="flex items-center space-x-4">
                            <Heart className="w-6 h-6" />
                            <Link to="/notifications">Notifications</Link>
                        </li>

                        <li className="flex items-center space-x-4">
                            <PlusCircle className="w-6 h-6" />
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </div>

                <div className="p-6">
                    <li className="flex items-center space-x-4">
                        <img
                            src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <Link to="/userprofile">Profile</Link>
                    </li>
                </div>
            </nav>
        </aside>
    );
};

export default Navbar;
