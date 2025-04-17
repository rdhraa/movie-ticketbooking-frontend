import React from 'react';
import { axiosInstance } from '../../config/axiosinstance';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm, useFieldArray } from "react-hook-form";

export const TheaterSignupPage = () => {
    const { register, handleSubmit, control,setValue, formState: { errors },watch } = useForm();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "screens"
    });
  const navigate = useNavigate();
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      data.role = "theater";
      const response = await axiosInstance.post("/theater/signup", data);
      toast.success("Theater signup successful!");
      navigate("/theater/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('/bg-img.webp')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      <div className="relative z-10 bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up Theater</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-4 relative">
            <input {...register("name", { required: "Theater Name is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text" placeholder="Theater Name" />
            <i className="absolute right-3 top-2">🎭</i>
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
            <input {...register("password", { required: "Password is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password" placeholder="Password" />
            <i className="absolute right-3 top-2">🔒</i>
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <input {...register("confirmPassword", {
              validate: value => value === password || "Passwords do not match"
            })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="password" placeholder="Confirm Password" />
            <i className="absolute right-3 top-2">🔒</i>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
          </div>

          {/* Location */}
          <div className="mb-4 relative">
            <input {...register("location", { required: "Location is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text" placeholder="Location" />
            <i className="absolute right-3 top-2">📍</i>
            {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
          </div>

          {/* City */}
          <div className="mb-4 relative">
            <input {...register("city", { required: "City is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text" placeholder="City" />
            <i className="absolute right-3 top-2">🏙️</i>
            {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
          </div>

          {/* Country */}
          <div className="mb-4 relative">
            <input {...register("country", { required: "Country is required" })}
              className="w-full p-2 rounded-lg bg-white placeholder-gray-500 bg-opacity-20 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text" placeholder="Country" />
            <i className="absolute right-3 top-2">🌍</i>
            {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
          </div>

          {/* Screens Section*/}
<div className="mb-4">
  <h3 className="text-white mb-2 font-semibold">Screens</h3>

  {fields.map((item, index) => (
    <div key={item.id} className="mb-2 p-2 border rounded-lg bg-white bg-opacity-10 backdrop-blur-md">
      {/* Screen Name */}
      <input
        {...register(`screens.${index}.name`, { required: "Screen name is required" })}
        className="w-full mb-1 p-2 rounded bg-white bg-opacity-20 text-purple-800"
        type="text"
        placeholder={`Screen ${index + 1} Name`}
      />
      {errors?.screens?.[index]?.name && (
        <span className="text-red-500 text-xs">{errors.screens[index].name.message}</span>
      )}

      {/* Screen Capacity */}
      <input
        {...register(`screens.${index}.capacity`, {
          required: "Capacity is required",
          valueAsNumber: true,
        })}
        className="w-full mb-1 p-2 rounded bg-white bg-opacity-20 text-purple-800"
        type="number"
        placeholder="Capacity"
      />
      {errors?.screens?.[index]?.capacity && (
        <span className="text-red-500 text-xs">{errors.screens[index].capacity.message}</span>
      )}

      {/* Facilities (comma separated) */}
      <input
        {...register(`screens.${index}.facilities`)}
        className="w-full p-2 rounded bg-white bg-opacity-20 text-purple-800"
        placeholder="Facilities (comma separated)"
        onChange={(e) => {
          const value = e.target.value.split(',').map(fac => fac.trim());
          control.setValue(`screens.${index}.facilities`, value);
        }}
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="text-sm text-red-400 mt-1 hover:underline"
      >
        Remove Screen
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => append({ name: "", capacity: "", facilities: [] })}
    className="text-sm text-purple-300 mt-2 hover:underline"
  >
    ➕ Add Screen
  </button>
</div>


          <button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-semibold transition">
            Sign Up as Theater
          </button>
        </form>
      </div>
    </div>
  );
};


