import React, { useRef, useImperativeHandle, useState } from "react";

const TextArea = React.forwardRef((props, ref) => {
  const textAreaRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true); 

  useImperativeHandle(ref, () => textAreaRef.current);

  // Handle auto-resize
  const handleChange = (e) => {
    const value = e.target.value;
    setIsEmpty(value.trim() === ""); // Update state based on content

    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior
      if (props.handleEvent && !isEmpty) {
        props.handleEvent(); // Trigger event if not empty
      }
    }
  };

  return (
    <div className="absolute bottom-6 left-[50%] -translate-x-1/2 h-auto flex justify-between items-end w-[80%] rounded-3xl px-3 py-2 bg-tertiary">
      <textarea
        ref={textAreaRef}
        name="chats"
        id="chats"
        placeholder="Message Aladdin..."
        className="w-[90%] p-2 relative h-full scroll-hidden resize-none bg-transparent outline-none placeholder:text-textlight text-white focus:outline focus:bg-transparent border-none max-h-[200px]"
        onKeyUp={handleChange}
        onKeyDown={handleKeyDown} // Add key down listener for Enter/Shift+Enter
        onChange={handleChange}
      ></textarea>

      <button
        type="button"
        onClick={isEmpty ? null : props.handleEvent} // Disable button if empty
        className={`rounded-full text-white p-2 ${
          isEmpty ? "opacity-50 bg-neutral-100 cursor-not-allowed" : "bg-white"
        }`}
        disabled={isEmpty} // Prevent clicks when textarea is empty
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            strokeWidth="20px"
          />
        </svg>
      </button>
    </div>
  );
});

export default TextArea;
