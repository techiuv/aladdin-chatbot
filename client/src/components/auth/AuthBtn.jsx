//this is a btn for sign up and login
import { useState } from "react";

const AuthBtn = ({ isDisabled, name, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-full flex justify-center items-center py-3 uppercase font-medium text-lg bg-white cursor-not-allowed opacity-65 text-secondary rounded-lg focus:outline-none">
            <div className="w-8 h-8 animate-spin  border-t-transparent border-4 border-secondary rounded-full "></div>
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full py-3 uppercase flex justify-center items-center font-medium text-lg bg-white text-secondary rounded-lg hover:bg-neutral-200 focus:outline-none"
          disabled={isDisabled}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default AuthBtn;
