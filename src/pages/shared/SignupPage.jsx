import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../config/axiosinstance';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";
import { toast } from "react-hot-toast";

export const UserSignupPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =useState(false);


  const signupAPI = "/user/signup";
  const loginRoute = "/login";
  const profileRoute = "/user/profile";

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const response = await axiosInstance({
        method: "POST",
        url: signupAPI,
        data: data,
      });
      dispatch(saveUser(response?.data?.data));
      toast.success("Signup successful");
      navigate(profileRoute);
    } catch (error) {
      toast.error("Signup Failed");
      console.log(error);
    }
  };
  

  const password = watch('password', '');


  const confirmPassword = watch('confirmPassword', '');


  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('/bg-img.webp')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      <div className="relative z-10 bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4 relative">
            <input {...register("name", { required: "Full Name is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text" placeholder="Full Name" />
            <i className="absolute right-3 top-2">👤</i>
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="mb-4 relative">
            <input {...register("email", { required: "Email is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email" placeholder="Email" />
            <i className="absolute right-3 top-2">📧</i>
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Mobile */}
          <div className="mb-4 relative">
            <input {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" }
            })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="tel" placeholder="Mobile Number" />
            <i className="absolute right-3 top-2">📱</i>
            {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile.message}</span>}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
        <input
        {...register("password", { required: "Password is required" })}
        className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        type={showPassword ? "text" : "password"}
       placeholder="Password"
      />
       <i
      className="absolute right-3 top-2 cursor-pointer"
       onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? "🙈" : "👁️"}
     </i>
       {errors.password && (
       <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}
  </div>


          {/* Confirm Password */}
          <div className="mb-4 relative">
  <input
    {...register("confirmPassword", {
      validate: (value) => value === password || "Passwords do not match",
    })}
    className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
  />
  <i
    className="absolute right-3 top-2 cursor-pointer"
    onClick={() => setShowConfirmPassword((prev) => !prev)}
  >
    {showConfirmPassword ? "🙈" : "👁️"}
  </i>
  {errors.confirmPassword && (
    <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
  )}
</div>
          {/* Submit Button */}
          <button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm mt-4 text-white">
          Already have an account? <Link to={loginRoute} className="underline hover:text-purple-300">Login</Link>
        </p>
      </div>
    </div>
  );
};
