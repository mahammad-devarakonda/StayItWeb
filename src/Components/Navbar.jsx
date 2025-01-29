import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, MessageCircle, Heart, PlusCircle} from "lucide-react";

const Navbar = () => {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed flex flex-col justify-between">

            <div className="p-6">
                <h1 className="text-3xl font-bold tracking-tight">𝒮𝓉𝒶𝓎𝐼𝓉</h1>
            </div>

            <nav className="flex-grow">
                <ul className="space-y-6 px-6 text-lg">
                    <li className="flex items-center space-x-4">
                        <Home className="w-6 h-6" />
                        <Link to="/" className="font-semibold">Home</Link>
                    </li>
                    <li className="flex items-center space-x-4">
                        <Search className="w-6 h-6" />
                        <Link to="/search">Search</Link>
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

                <div className="p-6">
                    <li className="flex items-center space-x-4">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <Link to="/profile">Profile</Link>
                    </li>
                </div>
            </nav>
        </aside>
    );
};

export default Navbar;
