import React from "react";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="bg-slate-700 text-white shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold">Essence Consultancy</div>
          <div className="flex space-x-4">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white text-white font-semibold"
                  : "hover:border-b-2 hover:border-white text-white font-medium"
              }
            >
              Tasks
            </NavLink>
          </div>
          <div>
            X
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
