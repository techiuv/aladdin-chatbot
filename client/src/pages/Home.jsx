import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import UserChats from '../components/ui/UserChats';
import Response from '../components/ui/Response';
import TextArea from '../components/ui/TextArea';
import Title from '../components/shared/Title';
import { typingEffect } from '../utils/typingEffect';
import ProgressBar from '../components/shared/ProgressBar';
import userContxent from '../context/userContext';


const Home = () => {
    const [chats, setChats] = useState([]);
    const chatInputRef = useRef(null);
    const containerRef = useRef(null);
    const email = useContext(userContxent)


    const appendMessage = async () => {
        const message = chatInputRef.current?.value.trim();
        if (!message) return;

        const updatedChats = [...chats, { type: 'user', text: message }];
        setChats(updatedChats);

        chatInputRef.current.value = '';

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, { message, email });

            setChats((prevChats) => [
                ...prevChats,
                { type: 'bot', text: response.data.reply },
            ]);
        } catch (error) {
            setChats((prevChats) => [
                ...prevChats,
                { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' },
            ]);
        }
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats]);



    useEffect(() => {
        const strings = ['How can I help you?'];
        typingEffect('typed-text', strings);

        return () => {
            const element = document.querySelector('typed-text');
            if (element) {
                element.innerHTML = '';
            }
        };
    }, []);






    return (
        <>
            <Title title='Aladin Chat-Bot' />
            <ProgressBar />

            <section className="grid bg-dark grid-cols-[0%,100%] overflow-auto scroll-hidden sm:grid-cols-[20%,80%]">
                <SideBar />
                <main className='h-[100vh] relative'>
                    <header>
                        <Navbar />
                    </header>

                    <div className="h-3/4 w-full relative flex  flex-col items-center justify-center">
                        {/* Conditionally render content */}
                        {chats.length === 0 ? (
                            <p
                                className="text-center flex justify-center items-center w-full capitalize text-white font-bold text-[4rem] typed-text"
                            ></p>
                        ) : (
                            <div className="w-full px-2  overflow-y-scroll h-full" ref={containerRef}>
                                {chats.map((chat, index) => (
                                    <div key={index} className="">
                                        {chat.type === 'user' ? (
                                            <UserChats message={chat.text} />
                                        ) : (
                                            <Response message={chat.text} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className=" absolute bottom-6 left-[50%] -translate-x-1/2 h-auto flex justify-between items-end  w-[80%] rounded-3xl px-3 py-2 bg-tertiary">

                        <TextArea ref={chatInputRef} />
                        <button
                            type="button"
                            onClick={appendMessage}
                            className="bg-white rounded-full text-white p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" strokeWidth='10px' />
                            </svg>
                        </button>
                    </div>
                </main>
            </section >
        </>
    );
};

export default Home;
