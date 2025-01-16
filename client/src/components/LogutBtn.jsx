import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { removeAuthTokens } from "../utils/checkAuthTokens";

const LogutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthTokens();

    navigate("/auth/login");
  };

  return <Button button={"Logout"} handleEvent={handleLogout} />;
};

export default LogutBtn;
