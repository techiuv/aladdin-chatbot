import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typewriter } from "react-simple-typewriter";

const Response = ({ message }) => {
  const [showCursor, setShowCursor] = useState(true); // State to control cursor visibility

  return (
    <div className="response-message float-left clear-both m-2 px-4 text-neutral-100 response font-normal text-sm md:text-lg">
      <Typewriter
        words={[message]} // Pass the message as the words to type out
        typeSpeed={20} // Speed of typing
        deleteSpeed={30} // Speed of deleting (if used)
        cursor={showCursor} // Control cursor visibility
        cursorStyle="|" // Customize the cursor style
        onLoopDone={() => setShowCursor(false)} // Hide the cursor when typing is done
      >
        {(typedMessage) => (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {typedMessage} {/* Inject the typewriter-typed content here */}
          </ReactMarkdown>
        )}
      </Typewriter>
    </div>
  );
};

export default Response;
