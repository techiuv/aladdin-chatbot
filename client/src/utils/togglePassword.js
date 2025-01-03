export const togglePasswordVisibility = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      const newType = inputElement.type === 'password' ? 'text' : 'password';
      inputElement.type = newType;
      return newType; // Return the new type to update the UI
    }
  };
  