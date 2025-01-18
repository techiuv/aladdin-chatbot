import React, { useEffect, useState, useRef, useContext } from "react";
// import { api } from "../services/api";
import axios from "axios";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import UserChats from "../components/ui/UserChats";
import Response from "../components/ui/Response";
import TextArea from "../components/ui/TextArea";
import Title from "../components/shared/Title";
import WelcomeMsg from "../components/ui/WelcomeMsg";
import ProgressBar from "../components/shared/ProgressBar";
import userContxent from "../context/userContext";

const Home = () => {
  const [chats, setChats] = useState([]);
  const chatInputRef = useRef(null);
  const containerRef = useRef(null);
  const email = useContext(userContxent);

  const appendMessage = async () => {
    const message = chatInputRef.current?.value.trim();
    if (!message) return;

    // Add user message to the chat state immutably
    const updatedChats = [...chats, { type: "user", text: message }];
    setChats(updatedChats);

    chatInputRef.current.value = ""; // Clear input field

    try {
      // Fetch bot response
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat`,
        { message, email }
      );

      // Append bot response immutably
      setChats((prevChats) => [
        ...prevChats,
        { type: "bot", text: response.data.reply }, // Add bot's reply
      ]);
    } catch (error) {
      // Handle error by appending an error message to the chat state
      setChats((prevChats) => [
        ...prevChats,
        {
          type: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      <ProgressBar />

      <Title title="Aladin Chat-Bot" />

      <section className="grid bg-dark grid-cols-[100%,100%] overflow-auto scroll-hidden md:grid-cols-[20%,80%]">
        <SideBar />
        <main className="h-[100vh] relative">
          <header>
            <Navbar />
          </header>

          <div className="h-3/4 w-full relative flex  flex-col items-center justify-center">
            {/* Conditionally render content */}
            {chats.length === 0 ? (
              <WelcomeMsg />
            ) : (
              <div
                className="w-full px-2 pb-4 mb-2 overflow-y-scroll h-full"
                ref={containerRef}
              >
                {chats.map((chat, index) => (
                  <div key={index} className="">
                    {chat.type === "user" ? (
                      <UserChats message={chat.text} />
                    ) : (
                      <Response message={chat.text} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextArea ref={chatInputRef} handleEvent={appendMessage} />
        </main>
      </section>
    </>
  );
};

export default Home;
