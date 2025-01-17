import { useContext, useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import userContext from "../context/userContext";

const DeleteChatsBtn = () => {
  const userEmail = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const deleteChats = async () => {
    setLoading(true);
    if (!userEmail) {
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/delete-chats`,
        {
          data: { email: userEmail },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <Button
      button="Delete Chats"
      handleEvent={deleteChats}
      isDisabled={loading}
    />
  );
};

export default DeleteChatsBtn;
