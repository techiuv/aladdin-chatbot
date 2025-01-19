import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
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

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSignUp = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (hasAuthTokens()) {
        removeAuthTokens();
      }
      const response = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/");
    } catch (err) {
      if (err.response) {
        // If there are validation errors
        if (err.response.status === 400) {
          const validationErrors = err.response.data.errors;
          if (validationErrors) {
            // Map the validation errors to the form fields
            for (const field in validationErrors) {
              setError(field, {
                type: "server",
                message: validationErrors[field],
              });
            }
          } else {
            setError("Account already exits.");
          }
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Sign Up - Aladdin" />
      <ProgressBar />

      <div className=" bg-secondary flex justify-center items-center flex-col h-screen w-screen ">
        <AuthHeading heading={"Create Account"} />

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="w-[90%] sm:w-[50%] md:w-[40%] mx-auto p-5 rounded-lg"
        >
          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Your Name "
              autoComplete="off"
              {...register("name", { required: "Name is required" })}
              className={`w-full p-4 text-sm  mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none  ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm my-2 font-normal">
                {errors.name.message}
              </p>
            )}
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Your Email "
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full p-4 text-sm  mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg outline-none focus:outline-none' : ''}`}
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

          {/* Submit Button */}
          <AuthBtn name={"Sign Up"} isDisabled={loading} isLoading={loading} />
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <AuthFooter
          text={"Already have an account? "}
          route={"login"}
          routeTo={"Login"}
        />
      </div>
    </>
  );
};

export default SignUp;
