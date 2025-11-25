import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import ProductCards from "./pages/tasks/tasks.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="products" element={<ProductCards />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);