import Typed from "typed.js";

export function typingEffect(
  className,
  strings = [],
  options = {},
  speed = 50,
  cursor = false
) {
  const defaultOptions = {
    typeSpeed: speed,
    backSpeed: 25,
    backDelay: 1000,
    showCursor: cursor,
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Select all elements with the specified class
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    new Typed(element, {
      strings: strings,
      ...finalOptions,
    });
  });
}
