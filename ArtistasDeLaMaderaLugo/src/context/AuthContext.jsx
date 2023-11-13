import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToCartService,
  getMyUserCartService,
  getMyUserDataService,
  getSalesInfoService,
} from "../services/index";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sales, setSales] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [emailAuth, setEmailAuth] = useState(localStorage.getItem("email"));
  const [userName, setUserName] = useState("");
  const [cancelledProducts, setCancelledProducts] = useState([]); // Un solo estado para productos cancelados
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("idUser", idUser);
    localStorage.setItem("role", role);
    localStorage.setItem("email", emailAuth);

    if (token && idUser) {
      getMyUserDataService(token).then((userData) => {
        setName(userData[0].name);
        setUserName(userData[0].username);
        setEmailAuth(userData[0].email);
        setPhone(userData[0].phone);
        setAddress(userData[0].address);
      });
      getMyUserCartService(token).then((cartData) => {
        setCartCount(cartData.products ? cartData.products.length : 0);
      });
      getSalesInfoService({ token }).then((saleData) => {
        setSales(saleData.data);
      });
    }
  }, [token]);

  const transferTempCartToUserCart = async (token) => {
    if (!token) {
      return;
    }

    try {
      const tempCart = JSON.parse(localStorage.getItem("tempCart")) || [];

      if (tempCart.length > 0) {
        for (const productId of tempCart) {
          await addToCartService(productId, token);
          getMyUserCartService(token).then((cartData) => {
            setCartCount(cartData.products ? cartData.products.length : 0);
          });
          navigate("/user/mycart");
        }

        localStorage.removeItem("tempCart");
      }
    } catch (error) {
      if (error.message == "El producto ya está su carrito.") {
        localStorage.removeItem("tempCart");
        navigate("/user/mycart");
      }
    }
  };

  function logout() {
    setToken("");
    setIdUser("");
    setRole("");
    setEmailAuth("");
    setName("");
    setUserName("");
    navigate("/");
    setCartCount(0);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setRole,
        setEmailAuth,
        setToken,
        setIdUser,
        logout,
        idUser,
        name,
        userName,
        role,
        emailAuth,
        phone,
        address,
        setAddress,
        setPhone,
        cartCount,
        setCartCount,
        sales,
        setSales,
        transferTempCartToUserCart,
        cancelledProducts,
        setCancelledProducts, // Usar el estado de productos cancelados en lugar de "cancelled"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
