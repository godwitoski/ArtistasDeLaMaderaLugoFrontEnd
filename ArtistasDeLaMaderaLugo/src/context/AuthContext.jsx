import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDataService } from "../services/index";

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
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("idUser", idUser);
    localStorage.setItem("role", role);
    localStorage.setItem("email", emailAuth);

    if (token && idUser) {
      getMyUserDataService(token).then((userData) => {
        setName(userData.name);
        setUserName(userData.username);
        setEmailAuth(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
