import { useState, useContext } from "react";
import Modal from "./ui/Modal";
import userContext from "../context/userContext";
import LogutBtn from "./LogutBtn";
import DeleteChatsBtn from "./DeleteChatsBtn";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = useContext(userContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="w-full min-h-[5vh] flex justify-between items-center px-4 py-1">
      <p className="text-xl text-neutral-200 cursor-pointer font-medium px-3">
        Aladdin
      </p>

      <button className="cursor-pointer" onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </button>

      {/* Using the Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Settings">
        <p className="flex justify-start items-center font-normal text-[1rem] m-1 py-2  border-b border-b-hover">
          {email}
        </p>
        <p className="flex justify-between items-center font-normal text-[1rem] m-1 py-2 border-b border-b-hover">
          Delete all chats
          <DeleteChatsBtn />
        </p>

        <p className="flex justify-between items-center font-normal text-[1rem] m-1 py-2">
          Logout on this device
          <LogutBtn />
        </p>
      </Modal>
    </nav>
  );
};

export default Navbar;
