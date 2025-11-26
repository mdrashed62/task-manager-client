import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Layout from "./layout/Layout.jsx";
import App from "./App.jsx";
import Tasks from "./pages/tasks/tasks.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<App />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    <ToastContainer />
  </BrowserRouter>
);
