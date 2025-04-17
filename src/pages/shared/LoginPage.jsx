import React from 'react';
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../config/axiosinstance';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { saveTheater, clearTheater } from "../../redux/features/theaterSlice";
import { toast } from "react-hot-toast";


export const LoginPage=({role})=> {


  const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
        role: "user",
        loginAPI: "/user/login",
        profileRoute: "/user/profile",
        signupRoute: "/signup",
    };

    if (role == "theater") {
        user.role = "theater";
        user.loginAPI = "/theater/login";
        (user.profileRoute = "/theater/profile"), (user.signupRoute = "/theater/signup");
    }

    const onSubmit = async (data) => {

        try {
            const response = await axiosInstance({
                method: "POST",
                url: user.loginAPI,
                data: data,
                withCredentials: true,
            });
            console.log("response====", response);
            if (role === "theater") {
              dispatch(saveTheater(response?.data?.data));
            } else {
              dispatch(saveUser(response?.data?.data));
            }
            toast.success("Login success");
            navigate(user.profileRoute);
        } catch (error) {
          if (role === "theater") {
            dispatch(clearTheater());
          } else {
            dispatch(clearUser());
          }
            toast.error("Login Failed");
            console.log(error);
        }
    };





  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b" >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('/bg-img.webp')` }}
      ></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold mb-4">Login {user.role}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email"
              id="email"
              placeholder="Email" {...register("email")}
            />
            <i className="absolute right-3 top-2  font-normal not-italic">👤</i>
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <i className="absolute right-3 top-2  font-normal not-italic">🔒</i>
          </div>
          <div className="flex justify-between items-center text-sm text-white mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 " />
              Remember me
            </label>
            <Link className="hover:underline">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700  p-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-white">
          Don't have an account? <Link to={user.signupRoute} className="underline hover:text-purple-300">Register</Link>
        </p>
      </div>
    </div>
  );
}





