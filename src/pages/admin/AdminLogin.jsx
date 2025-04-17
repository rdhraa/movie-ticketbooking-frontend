import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "../../config/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/admin/login", data);
      toast.success("Login successful!");
      console.log(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div
      className=" min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/adminbg.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl w-full max-w-md p-8 transition-transform animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-white font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}

          <label className="block mt-4 mb-2 text-white font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <span
              className="absolute right-3 top-3 text-white cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}

          <button
            type="submit"
            className="btn btn-primary mt-6 w-full hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-white">
          Don’t have an account?{" "}
          <Link to="/admin/signup" className="text-blue-300 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};
