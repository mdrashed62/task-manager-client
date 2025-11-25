import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success("Logout successful!");
      setShowDropdown(false);
      navigate("/login");
    } else {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-slate-800 text-white/80 shadow-lg py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-3xl font-bold flex items-center">
            Essence Consultancy
          </div>

          <div className="flex space-x-4 items-center">
            {user ? (
              <div className="relative">
                <div className="flex justify-between items-center gap-2">
                  <CgProfile className="text-3xl" />
                  <div
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 font-semibold transition duration-200"
                  >
                    <span>{user.fullName}</span>
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
                  </div>
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="text-gray-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-2 px-3">
                      <button
                        onClick={handleLogout}
                        className="w-full lg:w-1/2 text-left px-4 py-2 text-sm bg-red-200 rounded-full text-red-600 hover:bg-gray-100 transition duration-200 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
