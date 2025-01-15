import { useContext } from "react";
import axios from "axios";
import Button from "./ui/Button";
import userContext from "../context/userContext";

const DeleteChatsBtn = () => {
  const userEmail = useContext(userContext);

  const deleteChats = async () => {
    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/delete-chats`,
        {
          data: { email: userEmail },
        }
      );
      console.log("Chats deleted successfully:", response.data);
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
  };

  return <Button button="Delete Chats" handleEvent={deleteChats} />;
};

export default DeleteChatsBtn;
