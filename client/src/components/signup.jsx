import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import React from "react";
import { useState, useEffect } from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState({
    profileImage: "",
    coverImage: "",
  });

  const handleDataChange = (name) => (e) => {
    setData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const onSubmit = (data) => {
    console.log(data)
    console.log("profileimage:",file.profileImage)
    console.log("coverimage:",file.coverImage)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to MyTube
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create an account and enjoy live content and videos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                FullName
              </label>
              <input
                //value={data.fullName}
                onChange={handleDataChange("fullName")}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Full Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
               // value={data.userName}
                onChange={handleDataChange("UserName")}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
               // value={data.email}
                onChange={handleDataChange("email")}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                password
              </label>
              <input
                type="password"
              //  value={data.password}
                onChange={handleDataChange("password")}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password field is required",
                  validate: {
                    minLength: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long",
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) ||
                      "Password must contain at least one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* profileImage */}
            <div className="flex gap-6 justify-center items-center">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700">
                  ProfileImage
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="profileImage"
                  {...register("profileImage", {
                    required: "Profile image is required",
                  })}
                  onChange={(e) =>
                    setFile((prev) => ({
                      ...prev,
                      profileImage: e.target.files[0],
                    }))
                  }
                />
                <label
                  htmlFor="profileImage"
                  className="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer text-gray-400 text-sm hover:border-blue-500 hover:text-blue-500"
                >
                  {file.profileImage ? (
                    <img
                      src={URL.createObjectURL(file.profileImage)}
                      alt="profile preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    "Upload"
                  )}
                </label>
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profileImage.message}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700">
                  CoverImage
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="coverImage"
                  {...register("coverImage", {
                    required: "Cover image is required",
                  })}
                  onChange={(e) =>
                    setFile((prev) => ({
                      ...prev,
                      coverImage: e.target.files[0],
                    }))
                  }
                />
                <label
                  htmlFor="coverImage"
                  className="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer text-gray-400 text-sm hover:border-blue-500 hover:text-blue-500"
                >
                  {file.coverImage ? (
                    <img
                      src={URL.createObjectURL(file.coverImage)}
                      alt="cover preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    "Upload"
                  )}
                </label>
                {errors.coverImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.coverImage.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
