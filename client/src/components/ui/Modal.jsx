import { useState } from "react";
import userContext from "../../context/userContext";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-75">
      <div className="bg-tertiary w-11/12 max-w-lg rounded-2xl shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            className="text-white hover:text-neutral-100"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-2 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-1 md:p-4 text-neutral-50 text-sm">{children}</div>

        {/* Modal Footer */}
        {/* <div className="flex justify-end p-2">
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
