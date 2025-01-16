<<<<<<< HEAD
import React, { useRef, useImperativeHandle } from 'react';

const TextArea = React.forwardRef((props, ref) => {
    const textAreaRef = useRef(null);

    useImperativeHandle(ref, () => textAreaRef.current);

    const handleChange = (e) => {
        e.target.style.height = "auto";
        const scrollHeight = e.target.scrollHeight;
        e.target.style.height = `${scrollHeight}px`;

      
    };

    return (
        <textarea
            ref={textAreaRef}
            name="chats"
            id="chats"
            placeholder="Message Aladdin..."
            className="w-[90%] p-2 relative h-full scroll-hidden resize-none bg-transparent outline-none placeholder:text-textlight text-white focus:outline focus:bg-transparent border-none max-h-[200px]"
            onKeyUp={handleChange}
            onChange={handleChange}
        ></textarea>
    );
});

export default TextArea;
=======
import React, { useRef, useImperativeHandle } from 'react';

const TextArea = React.forwardRef((props, ref) => {
    const textAreaRef = useRef(null);

    useImperativeHandle(ref, () => textAreaRef.current);

    const handleChange = (e) => {
        e.target.style.height = "auto";
        const scrollHeight = e.target.scrollHeight;
        e.target.style.height = `${scrollHeight}px`;

      
    };

    return (
        <textarea
            ref={textAreaRef}
            name="chats"
            id="chats"
            placeholder="Message Aladdin..."
            className="w-[90%] p-2 relative h-full scroll-hidden resize-none bg-transparent outline-none placeholder:text-textlight text-white focus:outline focus:bg-transparent border-none max-h-[200px]"
            onKeyUp={handleChange}
            onChange={handleChange}
        ></textarea>
    );
});

export default TextArea;
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
