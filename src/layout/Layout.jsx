import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar.jsx";

function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F5FE]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
