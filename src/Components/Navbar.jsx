import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Compass, MessageCircle, Heart, PlusCircle, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import useUploadImage from "../Hooks/useUploadImage";
import MyRequestList from "./MyRequestList";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const user = useSelector((state) => state.user);
  const { content, setContent, handleFileChange, handleUpload, loading, error } = useUploadImage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRequestListOpen, setRequestListOpen] = useState(false);

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 fixed flex flex-col justify-between transition-all duration-300 overflow-hidden ${isCollapsed ? "w-16" : "w-64"
        }`}
    >

      <div className="p-4 flex justify-between items-center px-3">
        {!isCollapsed && <h1 className="text-2xl font-medium font-serif tracking-widest">StayIt</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 focus:outline-none">
          <Menu className="w-6 h-6 flex-shrink-0 cursor-pointer" />
        </button>
      </div>

      <nav className="flex flex-col flex-grow justify-between items-start px-3">
        <ul className="space-y-9 px-2 text-base items-center">
          <li className="flex items-center space-x-4">
            <Link to="/feed"><Home className="w-6 h-6 flex-shrink-0 cursor-pointer" /></Link>
            {!isCollapsed && <Link to="/feed" className="font-semibold cursor-pointer">Home</Link>}
          </li>

          <li className="flex items-center space-x-4">
            <Link to="/explore"><Compass className="w-6 h-6 flex-shrink-0 cursor-pointer" /></Link>
            {!isCollapsed && <Link to="/explore" className="font-semibold cursor-pointer">Explore</Link>}
          </li>

          <li className="flex items-center space-x-4 relative">
            <Link to="/inbox" ><MessageCircle className="w-6 h-6 flex-shrink-0 cursor-pointer" /></Link>
            <span className="absolute -top-2 left-5 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">5</span>
            {!isCollapsed && <Link to="/inbox" className="font-semibold cursor-pointer">Messages</Link>}
          </li>

          <li className="flex items-center space-x-4 cursor-pointer">
            <Heart className="w-6 h-6 flex-shrink-0" onClick={() => setRequestListOpen(true)} />
            {!isCollapsed && <button onClick={() => setRequestListOpen(true)} className="font-semibold cursor-pointer">Requests</button>}
          </li>

          <li className="flex items-center space-x-4 cursor-pointer">
            <PlusCircle className="w-6 h-6" onClick={() => setModalOpen(true)} />
            {!isCollapsed && <button onClick={() => setModalOpen(true)} className=" font-semibold cursor-pointer">
              Create
            </button>}
          </li>
        </ul>

        <div className="py-4">
          <Link to={`/userprofile/${user?.id}`} className="flex items-center space-x-4 flex-nowrap">
            <img src={user?.avatar} alt="User Avatar" className="w-8 h-8 rounded-full flex-shrink-0 min-w-[32px]" />
            {!isCollapsed && <p className="text-lg font-semibold whitespace-nowrap">{user?.userName}</p>}
          </Link>
        </div>

      </nav>

      <Modal isOpen={isRequestListOpen} onClose={() => setRequestListOpen(false)} title="Friend Requests">
        <MyRequestList />
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Create Post">
        <form onSubmit={handleUpload} className="flex flex-col gap-3 p-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded-md text-sm py-2 px-4" />
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="border rounded-md text-sm py-2 px-4" placeholder="Provide your caption" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </form>
      </Modal>
    </aside>
  );
};

export default Navbar;
