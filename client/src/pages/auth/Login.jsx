import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PasswordToggler from "../../components/ui/PasswordToggler";
import Title from "../../components/shared/Title";
import ProgressBar from "../../components/shared/ProgressBar";
import AuthBtn from "../../components/auth/AuthBtn";
import AuthHeading from "../../components/auth/AuthHeading";
import AuthFooter from "../../components/auth/AuthFooter";
import {
  hasAuthTokens,
  setAuthTokens,
  removeAuthTokens,
} from "../../utils/checkAuthTokens";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (hasAuthTokens()) {
        removeAuthTokens();
        setAuthTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      } else {
        setAuthTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      }
      // setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.error || "Login failed. Please try again.";
        setError(errorMessage);
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      // console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Login - Aladdin" />
      <ProgressBar />
      <div className=" bg-secondary flex justify-center items-center flex-col h-screen w-screen ">
        <AuthHeading heading={"Welcome Back! Cheif"} />

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-[90%] sm:w-[50%] md:w-[40%] mx-auto p-5 rounded-lg"
        >
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Your Email "
              // autoComplete='off'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full p-4 text-sm  mt-2 border outline-none border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm my-2 font-normal">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should ateast 8 characters",
                },
              })}
              className={`w-full p-4 password-input text-sm mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none`}
            />
            <PasswordToggler inputClass="password-input" />

            {errors.password && (
              <p className="text-red-500 text-sm my-2 font-normal">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <AuthBtn name={"Login"} isDisabled={loading} isLoading={loading} />
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <AuthFooter
          text={"Dont't have am account? "}
          route={"register"}
          routeTo={"Sign Up"}
        />
      </div>
    </>
  );
};

export default Login;
