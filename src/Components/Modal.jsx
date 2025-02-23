import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    ✖
                </button>
                
                {/* Modal Content */}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
