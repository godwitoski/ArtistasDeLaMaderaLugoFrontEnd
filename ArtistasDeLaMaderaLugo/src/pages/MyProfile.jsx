import React, { useState, useEffect, useContext } from "react";
import { getMyProfileService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

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
    <div>
      <h1>Mi Perfil</h1>
      {loading ? <p>Cargando Perfil...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {user ? (
        <div>
          <h2>Usuario: {user.username}</h2>
          <p>Nombre: {user.name}</p>
          <p>Correo Electrónico: {user.email}</p>
          <p>
            Teléfono: {user.phone ? user.phone : "No tiene teléfono añadido"}
          </p>
          <p>
            Dirección:{" "}
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
