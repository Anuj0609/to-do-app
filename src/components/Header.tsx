import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-center flex-col md:pt-20 pt-10  gap-4 px-4 sm:px-0">
      <img src="./logo.png" alt="App Logo" className="w-32 sm:w-auto" />
      <div className="text-center text-2xl font-semibold text-gray-700">
        "Stay on top of tasks, effortlessly."
      </div>
    </div>
  );
}

export default Header;
