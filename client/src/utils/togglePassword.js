export const togglePasswordVisibility = (inputId) => {
    const inputElement = document.querySelector(inputId);
    if (inputElement) {
      const newType = inputElement.type === 'password' ? 'text' : 'password';
      inputElement.type = newType;
      return newType; 
    }
  };
  