// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore.js";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        // Silent handling - user might not be logged in
        console.log("User not authenticated", err);
      }
    };
    
    initializeUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setShowDropdown(false);
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    if (user) {
      setShowDropdown(!showDropdown);
    } else {
      handleLogin();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-slate-800 text-white/80 shadow-lg py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="text-3xl font-bold flex items-center cursor-pointer hover:text-white transition duration-200"
            onClick={() => navigate("/")}
          >
            Essence Consultancy
          </div>

          <div className="flex space-x-4 items-center">
            <div className="relative profile-dropdown">
              <div className="flex justify-between items-center gap-2">
                <CgProfile className="text-3xl cursor-pointer hover:text-white transition duration-200" />
                <div
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 font-semibold cursor-pointer hover:text-white transition duration-200"
                >
                  <span>{user ? user.fullName : "Login"}</span>
                  {user && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {showDropdown && user && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold truncate">{user.fullName}</p>
                    <p className="text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-2 px-3">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center px-4 py-2 text-sm bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition duration-200 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;