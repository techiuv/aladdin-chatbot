import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { removeAuthTokens } from "../utils/checkAuthTokens";

const LogutBtn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    try {
      removeAuthTokens();

      navigate("/auth/login");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button button={"Logout"} handleEvent={handleLogout} isDisabled={loading} />
  );
};

export default LogutBtn;
