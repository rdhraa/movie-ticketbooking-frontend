import React from 'react';
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../config/axiosinstance';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";

export const SignupPage = ({ role }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    signupAPI: "/user/signup",
    loginRoute: "/login",
    profileRoute: "/user/profile",
  };

  if (role === "theater") {
    user.role = "theater";
    user.signupAPI = "/theater/signup";
    user.loginRoute = "/theater/login";
    user.profileRoute = "/theater/profile";
  }

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.signupAPI,
        data: data,
      });
      console.log("response====", response);
      dispatch(saveUser(response?.data?.data));
      // toast.success("Signup successful");
      navigate(user.profileRoute);
    } catch (error) {
      // toast.error("Signup Failed");
      console.log(error);
    }
  };

  const password = watch('password', '');

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('/bg-img.webp')` }}
      ></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up {user.role}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <i className="absolute right-3 top-2  font-normal not-italic">👤</i>
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <i className="absolute right-3 top-2  font-normal not-italic">🔒</i>
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: value =>
                  value === password || "Passwords do not match"
              })}
            />
            <i className="absolute right-3 top-2 font-normal not-italic">🔒</i>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
          </div>

          <div className="flex justify-between items-center text-sm text-white mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link className="hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700  p-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-white">
          Already have an account? <Link to={user.loginRoute} className="underline hover:text-purple-300">Login</Link>
        </p>
      </div>
    </div>
  );
};



