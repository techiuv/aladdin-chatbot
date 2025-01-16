<<<<<<< HEAD
export function hasAuthTokens() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return accessToken !== null && refreshToken !== null;
}

export const setAuthTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
};


export const removeAuthTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
=======
export function hasAuthTokens() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return accessToken !== null && refreshToken !== null;
}

export const setAuthTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
};


export const removeAuthTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
}