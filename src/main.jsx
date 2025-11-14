import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";
import ProductCards from "./pages/tasks/tasks.jsx";

const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="products" element={<ProductCards />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
