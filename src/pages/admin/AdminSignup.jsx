import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";

export const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: "admin" }; 
      const res = await axiosInstance.post("/admin/signup", payload);
      toast.success("Signup successful!");
      navigate("/admin/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/adminbg.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl w-full max-w-md p-8 transition-transform animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label className="block mb-2 text-white font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>}

          {/* Email */}
          <label className="block mt-4 mb-2 text-white font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}

          {/* Mobile */}
          <label className="block mt-4 mb-2 text-white font-medium">Mobile</label>
          <input
            type="tel"
            className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
            placeholder="Enter your mobile number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
          />
          {errors.mobile && <p className="text-red-300 text-sm mt-1">{errors.mobile.message}</p>}

          {/* Password */}
          <label className="block mt-4 mb-2 text-white font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            <span
              className="absolute right-3 top-3 text-white cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}

          {/* Confirm Password */}
          <label className="block mt-4 mb-2 text-white font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-white"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span
              className="absolute right-3 top-3 text-white cursor-pointer"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary mt-6 w-full hover:scale-105 transition-transform"
          >
            Signup
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-white">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-blue-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
