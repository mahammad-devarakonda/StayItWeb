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
import useUploadImage from "../Hooks/useUploadImage";
import MyRequestList from "./MyRequestList";

const Navbar = () => {
  const location = useLocation();
  const authData = useSelector((state) => state.auth);
  const {
    content,
    setContent,
    handleFileChange,
    handleUpload,
    loading,
    error,
  } = useUploadImage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRequestListOpen, setRequestListOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen bg-white border-r border-gray-200 fixed flex-col justify-between transition-all duration-300 overflow-hidden w-16">
        <div className="flex justify-between items-center px-4 py-3">
          <h1 className="text-2xl font-medium font-serif tracking-widest">
            ST
          </h1>
        </div>

        <nav className="flex flex-col flex-grow justify-between items-start px-3 mt-10">
          <ul className="space-y-9 px-2 text-base items-center">
            <li className="flex items-center space-x-4">
              <Link to="/feed">
                <Home className="w-6 h-6 flex-shrink-0 cursor-pointer" />
              </Link>
            </li>

            <li className="flex items-center space-x-4 relative">
              <Link to="/inbox">
                <MessageCircle className="w-6 h-6 flex-shrink-0 cursor-pointer" />
              </Link>
            </li>

            <li className="flex items-center space-x-4 cursor-pointer">
              <Heart
                className="w-6 h-6 flex-shrink-0"
                onClick={() => setRequestListOpen(true)}
              />
            </li>

            <li className="flex items-center space-x-4 cursor-pointer">
              <PlusCircle
                className="w-6 h-6"
                onClick={() => setModalOpen(true)}
              />
            </li>

            <li className="flex items-center space-x-4">
              <Link to="/developer">
                <Code className="w-6 h-6 flex-shrink-0 cursor-pointer" />
              </Link>
            </li>
          </ul>

          <div className="py-4">
            <Link
              to={`/userprofile/${authData?.user?.id}`}
              className="flex items-center space-x-4 flex-nowrap"
            >
              <img
                src={authData?.user?.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full flex-shrink-0 min-w-[32px]"
              />
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50 flex justify-around items-center py-2">
        <Link
          to="/feed"
          className={`flex flex-col items-center ${
            location.pathname === "/feed" && "text-blue-600"
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
          className={`flex flex-col items-center ${
            location.pathname === "/inbox" && "text-blue-600"
          }`}
        >
          <MessageCircle size={22} />
          <span className="text-[10px]">Inbox</span>
        </Link>
        <Link to={`/userprofile/${authData?.user?.id}`} className="flex flex-col items-center">
          <User size={22} />
          <span className="text-[10px]">Me</span>
        </Link>
        <Link
          to="/developer"
          className={`flex flex-col items-center ${
            location.pathname === "/explore" && "text-blue-600"
          }`}
        >
          <Code size={22} />
          <span className="text-[10px]">Developer</span>
        </Link>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isRequestListOpen}
        onClose={() => setRequestListOpen(false)}
        title="Friend Requests"
      >
        <MyRequestList />
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Post"
      >
        <form onSubmit={handleUpload} className="flex flex-col gap-3 p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-md text-sm py-2 px-4"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded-md text-sm py-2 px-4"
            placeholder="Provide your caption"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </form>
      </Modal>
    </>
  );
};

export default Navbar;
