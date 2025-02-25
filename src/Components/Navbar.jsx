import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Compass, MessageCircle, Heart, PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import useUploadImage from "../Hooks/useUploadImage";
import MyRequestList from "./MyRequestList";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const { content, setContent, imageURL, setImageURL, handleChange, loading } = useUploadImage();

  const [isRequestListOpen,setRequestListOpen]=useState(false)
  
  return (
    <>
      <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-medium font-serif text-left tracking-widest">
            StayIt
          </h1>
        </div>

        <nav className="flex flex-col justify-between h-full">
          <div>
            <ul className="space-y-6 px-6 text-base">
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
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                    5
                  </span>
                </MessageCircle>
                <Link to="/inbox">Messages</Link>
              </li>

              <li className="flex items-center space-x-4 cursor-pointer">
                <Heart className="w-6 h-6" />
                <button className="cursor-pointer" onClick={() => setRequestListOpen(true)}>Requests</button>
              </li>

              <li className="flex items-center space-x-4 cursor-pointer">
                <PlusCircle className="w-6 h-6" />
                <button onClick={() => setModalOpen(true)} className="cursor-pointer">
                  Create
                </button>
              </li>
            </ul>
          </div>

          <div className="p-6">
            <li className="flex items-center space-x-4">
              <Link to={`/userprofile/${user.id}`} className="flex flex-row gap-4 items-center">
                <img
                  src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-lg">{user?.userName}</p>
              </Link>
            </li>
          </div>
        </nav>
      </aside>

      <Modal isOpen={isRequestListOpen} onClose={() => setRequestListOpen(false)} title="Friend Requests">
        <MyRequestList/>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Create Post">
        <div className="border border-dashed border-black p-4 rounded-lg flex flex-col items-center gap-3 w-72 mx-auto mt-10">
          <form onChange={handleChange} className="flex flex-col gap-2">
            <input onChange={(e) => setImageURL(e.target.value)} type="url" className="border w-full rounded-md text-xs py-2 px-4" placeholder="Please provide Image URL" />
            <input onChange={(e) => setContent(e.target.value)} type="text" className="border w-full rounded-md text-xs py-2 px-4" placeholder="Provide your caption" />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
