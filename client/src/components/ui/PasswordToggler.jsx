import React, { useState } from "react";

const PasswordToggler = ({ inputClass }) => {
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    const inputElements = document.querySelectorAll(`.${inputClass}`);
    inputElements.forEach((inputElement) => {
      if (inputElement) {
        const newType = inputElement.type === "password" ? "text" : "password";
        inputElement.type = newType;
      }
    });
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center m-1 gap-2">
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={isChecked}
        onChange={togglePasswordVisibility}
      />
      <label className="text-sm cursor-pointer">Show password</label>
    </div>
  );
};

export default PasswordToggler;
