<<<<<<< HEAD
export const togglePasswordVisibility = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      const newType = inputElement.type === 'password' ? 'text' : 'password';
      inputElement.type = newType;
      return newType; // Return the new type to update the UI
    }
  };
=======
export const togglePasswordVisibility = (inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      const newType = inputElement.type === 'password' ? 'text' : 'password';
      inputElement.type = newType;
      return newType; // Return the new type to update the UI
    }
  };
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
  