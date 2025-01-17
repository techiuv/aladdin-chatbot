import React, { useContext } from "react";
import userContext from "../context/userContext";
import DeleteChatsBtn from "./DeleteChatsBtn";
import LogoutBtn from "./LogutBtn";

const Settings = () => {
  const email = useContext(userContext); // Access user email from context

  return (
    <div className="">
      {/* Display user email */}
      <p className="flex justify-start items-center font-normal text-[1rem] m-1 py-2 border-b border-gray-600">
        Email: {email}
      </p>

      {/* Delete chats button */}
      <p className="flex justify-between items-center font-normal text-[1rem] m-1 py-2 border-b border-gray-600">
        Delete all chats
        <DeleteChatsBtn />
      </p>

      {/* Logout button */}
      <p className="flex justify-between items-center font-normal text-[1rem] m-1 py-2">
        Logout on this device
        <LogoutBtn />
      </p>
    </div>
  );
};

export default Settings;
