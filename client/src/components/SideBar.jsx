import ChatHistory from "./ui/ChatHistory";
const SideBar = () => {
  return (
    <aside className="hidden md:flex flex-col items-center justify-between bg-secondary w-full text-white h-screen">
      <div className="w-full px-3 py-2 text-lg m-1 flex items-center">
        <p>History</p>
      </div>
      <ChatHistory />
    </aside>
  );
};

export default SideBar;
