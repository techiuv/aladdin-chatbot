import React from "react";

const UserChats = ({ message }) => {
  return (
    <div className="float-right clear-both bg-tertiary m-3 font-normal text-lg rounded-3xl flex text-neutral-100 justify-center items-center max-w-[60%] px-4 py-2 ">
      <p>{message}</p>
    </div>
  );
};

export default UserChats;
