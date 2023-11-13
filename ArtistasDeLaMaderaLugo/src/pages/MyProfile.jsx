import React, { useState, useEffect, useContext } from "react";
import { getMyProfileService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const data = await getMyProfileService(token);
        setUser(data.user[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  return (
    <div className="profilePage">
      <h1>Mi Perfil</h1>
      {loading ? <p>Cargando Perfil...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {user ? (
        <div>
          <h2>Usuario: {user.username}</h2>
          <p>
            <strong> Nombre:</strong>
            {user.name}
          </p>
          <p>
            <strong> Correo Electrónico:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong>
            {user.phone ? user.phone : "No tiene teléfono añadido"}
          </p>
          <p>
            <strong>Dirección: </strong>
            {user.address ? user.address : "Aún no ha añadido dirección"}
          </p>
          <Link to="/user/editprofile">
            <button>Editar Perfil</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default MyProfile;
