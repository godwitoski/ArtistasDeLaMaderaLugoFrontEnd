import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import "./styles/Header.css";
import "./styles/forms.css";
import "./styles/homepage.css";
import "./styles/cartpage.css";
import "./styles/searchPage.css";
import "./styles/orderProduct.css";
import "./styles/orderPage.css";
import "./styles/profilePage.css";
import "./styles/infoSales.css";
import "./styles/singleProduct.css";

import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import AddProduct from "./pages/Addproduct";
import SingleProduct from "./pages/SingleProduct";
import UsersInfo from "./components/UsersInfo";
import MyUserCart from "./components/MyUserCart";
import MyOrders from "./components/MyOrders";
import MyProfile from "./pages/MyProfile";
import { EditProfile } from "./components/EditProfile";
import ProductSearch from "./pages/ProductSearch";
import SalesInfoPage from "./pages/SalesInfoPage";
import OrderProduct from "./components/orderProduct";
import OrdersPendingPage from "./pages/OrdersPendingPage";
import { Header } from "./components/Header";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="body-app">
      {!hideHeader && <Header />}
      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/addNew" element={<AddProduct />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/products/search" element={<ProductSearch />} />
          <Route path="/products/sales" element={<SalesInfoPage />} />
          <Route path="/products/sendOrder" element={<OrderProduct />} />
          <Route path="/products/orders" element={<OrdersPendingPage />} />
          <Route path="/users" element={<UsersInfo />} />
          <Route path="/user/mycart" element={<MyUserCart />} />
          <Route path="/user/myorders" element={<MyOrders />} />
          <Route path="/user/myuser" element={<MyProfile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
