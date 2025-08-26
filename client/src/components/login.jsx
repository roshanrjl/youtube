import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
          <CardAction className="text-blue-600 hover:underline cursor-pointer">
           <Link to="/singup">
           Signup
           </Link> 
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                placeholder="Enter email or username"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register("email", {
                  required: "Email or username is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p className="text-gray-500">Or login with</p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Facebook
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
              GitHub
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
