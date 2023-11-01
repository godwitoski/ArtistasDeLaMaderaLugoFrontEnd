import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/Header";
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
          <Route path="/products/search" element={<ProductSearch />} />
          <Route path="/products/sales" element={<SalesInfoPage />} />
          <Route path="/products/sendOrder" element={<OrderProduct />} />
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
