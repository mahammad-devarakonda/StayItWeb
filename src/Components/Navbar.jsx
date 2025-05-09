import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Heart,
  PlusCircle,
  Code,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import MyRequestList from "./MyRequestList";
import AddPost from "./AddPost";

const Navbar = () => {
  const location = useLocation();
  const { user: { id, email, userName, avatar } } = useSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRequestListOpen, setRequestListOpen] = useState(false);


  return (
    <>
      <div className="hidden md:flex h-screen bg-white border-r border-gray-200 fixed flex-col justify-between transition-all duration-300 overflow-hidden w-16 ">
        <div className="flex justify-center items-center px-4 py-5">
          <h1 className="text-3xl font-serif font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text tracking-widest drop-shadow-lg animate-infinitePulse">
            ∞
          </h1>
        </div>

        <nav className="flex flex-col flex-grow justify-between items-center px-2 mt-4 relative">
          <ul className="flex flex-col space-y-8 text-base w-full items-center">
            <li className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
              <Link
                to="/feed"
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <Home className="w-6 h-6 flex-shrink-0" />
              </Link>
            </li>

            <li className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
              <Link
                to="/inbox"
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <MessageCircle className="w-6 h-6 flex-shrink-0" />
              </Link>
            </li>

            <li className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
              <button
                onClick={() => setRequestListOpen(true)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50 focus:outline-none"
              >
                <Heart className="w-6 h-6 flex-shrink-0" />
              </button>
            </li>

            <li className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50 focus:outline-none"
              >
                <PlusCircle className="w-6 h-6 flex-shrink-0" />
              </button>
            </li>

            <li className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
              <Link
                to="/developer"
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <Code className="w-6 h-6 flex-shrink-0" />
              </Link>
            </li>
          </ul>

          <div className="py-3 flex items-center justify-center group-hover:justify-start transition-all duration-300">
            <Link
              to={`/userprofile/${id}`}
              className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
            >
              <div className="relative">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full flex-shrink-0 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

        </nav>
      </div>


      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50 flex justify-around items-center py-2">
        <Link
          to="/feed"
          className={`flex flex-col items-center ${location.pathname === "/feed" && "text-blue-600"
            }`}
        >
          <Home size={22} />
          <span className="text-[10px]">Home</span>
        </Link>
        <button onClick={() => setModalOpen(true)} className="flex flex-col items-center">
          <PlusCircle size={22} />
          <span className="text-[10px]">Create</span>
        </button>
        <Link
          to="/inbox"
          className={`flex flex-col items-center ${location.pathname === "/inbox" && "text-blue-600"
            }`}
        >
          <MessageCircle size={22} />
          <span className="text-[10px]">Inbox</span>
        </Link>
        <Link
          to="/developer"
          className={`flex flex-col items-center ${location.pathname === "/explore" && "text-blue-600"
            }`}
        >
          <Code size={22} />
          <span className="text-[10px]">Developer</span>
        </Link>
        <li className="flex flex-col items-center cursor-pointer">
          <Heart
            className="w-6 h-6 flex-shrink-0"
            onClick={() => setRequestListOpen(true)}
          />
          <span className="text-[10px]">Notifications</span>
        </li>
        <Link to={`/userprofile/${id}`} className="flex flex-col items-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[10px]">Me</span>
        </Link>
      </div>

      <Modal
        isOpen={isRequestListOpen}
        onClose={() => setRequestListOpen(false)}
        title="Friend Requests"
        modalClassName="rounded-2xl"
      >
        <MyRequestList />
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Post"
        modalClassName="rounded-2xl"
      >
        <AddPost />
      </Modal>
    </>
  );
};

export default Navbar;
