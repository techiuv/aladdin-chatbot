const Button = ({ button, handleEvent, isDisabled }) => {
  return (
    <button
      className={`px-4 py-2 bg-transparent border border-hover text-white text-sm font-normal rounded-full hover:bg-hover ${
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      onClick={handleEvent}
      disabled={isDisabled}
    >
      {button}
    </button>
  );
};

export default Button;
