import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import React from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Full Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
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
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
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
                Login
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
