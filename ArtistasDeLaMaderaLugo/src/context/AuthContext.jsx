import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserCartService, getMyUserDataService } from "../services/index";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [emailAuth, setEmailAuth] = useState(localStorage.getItem("email"));
  const [userName, setUserName] = useState("");
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
        setCartCount(cartData.products.length ? cartData.products.length : 0);
      });
    }
  }, [token]);

  function logout() {
    setToken("");
    setIdUser("");
    setRole("");
    setEmailAuth("");
    setName("");
    setUserName("");
    navigate("/");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
