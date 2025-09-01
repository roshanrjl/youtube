import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./components/ui/button";
import { logout } from "../redux/authSlice";

// ShadCN UI dropdown menu imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

function Menubar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 shadow bg-blue-400 dark:bg-gray-900">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-white dark:text-gray-100">
          MyTube
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Right Side Menu */}
      <div className="flex items-center gap-4 text-xl text-white dark:text-gray-100 cursor-pointer">
        {/* Upload Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Upload</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 rounded-lg shadow-md">
            <DropdownMenuItem>
              <Link to="/upload-video" className="w-full block">
                Upload Video
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/go-live" className="w-full block">
                Go Live
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/create-post" className="w-full block">
                Create Post
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification */}
        <Link to="notification">🔔</Link>

        {/* Login / Logout */}
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Menubar;
