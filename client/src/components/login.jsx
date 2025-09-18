import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { googlelogin } from "../api/userApi/userapi";
import { githublogin } from "../api/userApi/userapi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Helper function to detect email
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const onSubmit = async (formData) => {
    // Determine whether the identifier is email or username
    const data = {
      password: formData.password,
      ...(isValidEmail(formData.identifier)
        ? { email: formData.identifier }
        : { username: formData.identifier }),
    };

    try {
      const response = await dispatch(login(data));

      if (login.fulfilled.match(response)) {
        navigate("/");
      } else {
        // Show backend error in form
        setError("identifier", { type: "manual", message: response.payload });
        setError("password", { type: "manual", message: response.payload });
      }
    } catch (err) {
      console.error("Something went wrong during login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email or username to login
          </CardDescription>
          <CardAction className="text-blue-600 hover:underline cursor-pointer">
            <Link to="/signup">Signup</Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Identifier */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="Enter email or username"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register("identifier", {
                  required: "Email or username is required",
                })}
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={isloading}
            >
              {isloading ? "Logging in..." : "Login"}
            </button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p className="text-gray-500">Or login with</p>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={async () => {
                try {
                  window.location.href =
                    "http://localhost:5000/api/v1/users/google";
                } catch (error) {
                  console.log("error occured while login", error);
                }
              }}
            >
              google
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              onClick={() => {
                // Redirect browser to backend GitHub OAuth endpoint
                window.location.href =
                  "http://localhost:5000/api/v1/users/github";
              }}
            >
              GitHub
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
