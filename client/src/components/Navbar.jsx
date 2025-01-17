import { useState } from "react";
import Modal from "./ui/Modal";
import Profile from "./ui/Profile";
import Settings from "./Settings";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Profile handleEvent={handleOpenModal} />

      {/* Using the Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Settings">
        <Settings />
      </Modal>
    </nav>
  );
};

export default Navbar;
