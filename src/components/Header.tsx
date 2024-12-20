import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-center flex-col mt-10 gap-4">
      <img src="./logo.png" alt="App Logo" />
      <div className="w-2/3 mx- auto text-center text-xl font-medium text-gray-700">
        Easily manage and organize your tasks with our simple and intuitive
        To-Do list app.
      </div>
    </div>
  );
}

export default Header;
