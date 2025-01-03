import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";

const SideBar = () => {
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);

    const email = useContext(userContext);

    const fetchChats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/history`,
                {
                    params: { email },
                }
            );

            if (Array.isArray(response.data)) {
                setChats((prevChats) => [...prevChats, ...response.data]);
            } else {
                setError("Unexpected response format.");
            }
        } catch (err) {
            setError("Failed to fetch chat history. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email) {
            fetchChats();
        }
    }, [email]);








    return (
        <>
            <aside className="hidden lg:flex flex-col items-center justify-between bg-secondary w-full text-white h-screen">
                <div className="w-full px-3 py-2 text-lg m-1 flex items-center">
                    <p>History</p>
                </div>

                <div className="h-[90%] w-full scroll-hidden overflow-y-scroll">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-7 h-7 border-4 border-t-4 border-white border-dotted rounded-full animate-spin opacity-70"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center p-4">{error}</div>
                    ) : chats.length === 0 ? (
                        <div className="text-center text-white p-4">No chat history found.</div>
                    ) : (
                        <div className="text-white p-2">
                            {chats.map((chat, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="text-white font-normal hover:bg-hover cursor-pointer rounded-lg py-2 px-2 mx-auto w-[95%] flex justify-between items-center text-sm">
                                        <p>{chat.user_message || chat.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default SideBar;
