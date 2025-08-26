import React from "react";
import { Link } from "react-router-dom";

function Menubar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 shadow bg-blue-400 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-white dark:text-gray-100">MyTube</div>
      </div>

      <div className="flex-1 mx-6 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-4 text-xl text-white dark:text-gray-100 cursor-pointer">
        <Link to="upload">Upload</Link>
        <Link to="notification">🔔</Link>
        <Link to="login">Login</Link>
       
      </div>
    </header>
  );
}

export default Menubar;
