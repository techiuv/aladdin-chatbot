import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../../components/shared/Title";
import { togglePasswordVisibility } from "../../utils/togglePassword";
import ProgressBar from "../../components/shared/ProgressBar";
import {
  hasAuthTokens,
  setAuthTokens,
  removeAuthTokens,
} from "../../utils/checkAuthTokens";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      // Save tokens in localStorage

      if (hasAuthTokens()) {
        // console.log("Both tokens are available in localStorage.");
        removeAuthTokens();
        setAuthTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      } else {
        // console.log("One or both tokens are missing.");
        setAuthTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      }

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
        <h2 className="text-[3rem] capitalize font-bold text-white text-center mb-4">
          Welcome Back!
        </h2>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-[40%] mx-auto p-5 rounded-lg"
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
              className={`w-full p-4 text-sm mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm my-2 font-normal">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          {loading ? (
            <div className="flex justify-center">
              <div className="w-full flex justify-center items-center py-3 uppercase font-medium text-lg bg-white cursor-not-allowed opacity-65 text-secondary rounded-lg focus:outline-none">
                <div className="w-8 h-8 animate-spin  border-t-transparent border-4 border-secondary rounded-full "></div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 uppercase flex justify-center items-center font-medium text-lg bg-white text-secondary rounded-lg hover:bg-neutral-200 focus:outline-none"
              disabled={loading}
            >
              Login
            </button>
          )}
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div>
          <p className="text-lg text-textlight">
            Don't have a account?{" "}
            <Link to={"/auth/register"} className="text-white underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
