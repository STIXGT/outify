import React from "react";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 z-50 justify-center content-center h-[calc(100vh-10rem)]">
      {/* Home Icon */}
      <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
        <span className="text-gray-800 font-bold text-lg">H</span>
      </div>

      {/* Profile Icon */}
      <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
        <span className="text-gray-800 font-bold text-lg">P</span>
      </div>

      {/* Settings Icon */}
      <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
        <span className="text-gray-800 font-bold text-lg">S</span>
      </div>

      {/* Messages Icon */}
      <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
        <span className="text-gray-800 font-bold text-lg">M</span>
      </div>
    </div>
  );
}
