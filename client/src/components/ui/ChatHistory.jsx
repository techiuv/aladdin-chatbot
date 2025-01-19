import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import userContext from "../../context/userContext";
import api from "../../services/api";

const ChatHistory = () => {
  const { user } = useContext(userContext);
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch chats in chunks
  const fetchChats = async () => {
    if (!user?.email) return; // Ensure email is available

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/history`, {
        params: {
          email: user.email,
          page, // Pass current page as a query parameter
        },
      });

      const data = response.data;

      // If no more data, stop further requests
      if (data.length === 0) {
        setHasMore(false);
      }

      // Append new chats to the existing ones
      setChats((prevChats) => [...prevChats, ...data]);
      setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to load chat history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="h-[90%] w-full overflow-y-scroll">
      {loading && chats.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-7 h-7 border-4 border-t-4 border-white border-dotted rounded-full animate-spin opacity-70"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <button
            onClick={fetchChats}
            className="mt-2 px-4 py-2 bg-primary rounded hover:bg-hover text-white"
          >
            Retry
          </button>
        </div>
      ) : chats.length === 0 ? (
        <div className="text-center text-white p-4">No chat history found.</div>
      ) : (
        <InfiniteScroll
          dataLength={chats.length} // Total number of items currently loaded
          next={fetchChats} // Function to fetch the next set of data
          hasMore={hasMore} // Indicate if more data is available
          loader={
            <div className="flex justify-center items-center py-4">
              <div className="w-5 h-5 border-4 border-t-4 border-white border-dotted rounded-full animate-spin opacity-70"></div>
            </div>
          }
          scrollableTarget="scrollableDiv" // Target container for scrolling
          endMessage={
            <p className="text-center text-white p-4">
              You have reached the end.
            </p>
          }
        >
          <div className="text-white p-2">
            {chats.map((chat, index) => (
              <div
                key={index} // Use index as a fallback if chat IDs are unavailable
                className="space-y-2 text-white font-normal hover:bg-hover cursor-pointer rounded-lg py-2 px-2 mx-auto w-[95%] flex justify-between items-center text-sm"
              >
                <p>{chat.user_message || chat.bot_response}</p>
                <span className="text-xs text-gray-400">
                  {new Date(chat.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ChatHistory;
