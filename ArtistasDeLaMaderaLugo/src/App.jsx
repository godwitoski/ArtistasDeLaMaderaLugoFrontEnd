import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/Header";
import AddProduct from "./pages/Addproduct";
import SingleProduct from "./pages/SingleProduct";

import "./styles/App.css";
function App() {
  return (
    <div className={`body-app`}>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/addNew" element={<AddProduct />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
