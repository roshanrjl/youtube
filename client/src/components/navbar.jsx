import React from "react";


function Menubar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 shadow bg-blue-400">
      <div className="flex items-center gap-4">
      
        <div className="text-xl font-bold text-white">MyTube</div>
      </div>

      <div className="flex-1 mx-6 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4 text-xl text-white cursor-pointer">
        <button title="Upload">⬆️ Upload</button>
        <button title="Notifications">🔔</button>
        <button title="Logout">login</button>
      </div>
    </header>
  );
}

export default Menubar;
