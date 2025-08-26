import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { registers } from "../redux/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isloading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState({
    profileImage: null,
    coverImage: null,
  });

  const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("username", data.userName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("profileImage", file.profileImage);
  formData.append("coverImage", file.coverImage);

  try {
    const resultAction = await dispatch(registers(formData));
    if (registers.fulfilled.match(resultAction)) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      
      alert(resultAction.payload || "Registration failed");
    }
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
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
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("userName", { required: "Username is required" })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email must be valid",
                  },
                })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
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
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Profile & Cover Images Side by Side */}
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
                  onChange={(e) =>
                    setFile((prev) => ({
                      ...prev,
                      profileImage: e.target.files[0],
                    }))
                  }
                  accept="image/*"
                />
                <label
                  htmlFor="profileImage"
                  className="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer text-gray-400 text-sm hover:border-blue-500 hover:text-blue-500"
                >
                  {file.profileImage ? (
                    <img
                      src={URL.createObjectURL(file.profileImage)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    "Upload"
                  )}
                </label>
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
                  onChange={(e) =>
                    setFile((prev) => ({
                      ...prev,
                      coverImage: e.target.files[0],
                    }))
                  }
                  accept="image/*"
                />
                <label
                  htmlFor="coverImage"
                  className="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer text-gray-400 text-sm hover:border-blue-500 hover:text-blue-500"
                >
                  {file.coverImage ? (
                    <img
                      src={URL.createObjectURL(file.coverImage)}
                      alt="Cover Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    "Upload"
                  )}
                </label>
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
              <Link className="text-blue-600 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
