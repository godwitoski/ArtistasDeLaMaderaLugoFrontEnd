// UsersInfo.jsx
import { useContext, useEffect, useState } from "react";
import { getUsersService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

function UsersInfo() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Cargando...");
  const { token, idUser } = useContext(AuthContext);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const usersData = await getUsersService(token);
        const filteredUsers = usersData.filter(
          (user) => parseInt(user.id) !== parseInt(idUser)
        );
        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        setError("Hubo un error al obtener usuarios");
        setLoading(false);
      }
    };

    getAllUsers();
  }, [users.length]);

  return (
    <section className="users-info">
      <h1>Información de Usuarios</h1>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <h2>
                <strong>Usuario:</strong> {user.username}
              </h2>
              <p>
                <strong>Nombre:</strong> {user.name}
              </p>
              <p>
                <strong>Correo Electrónico:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong> {user.role}
              </p>
              <p>
                <strong>Teléfono:</strong>{" "}
                {user.phone ? user.phone : "No tiene teléfono añadido"}
              </p>
              <p>
                <strong>Dirección:</strong>{" "}
                {user.address ? user.address : "Aún no ha añadido dirección"}
              </p>
              <div className="list-products">
                <h3>Productos Vendidos:</h3>
                {user.purchasedProducts.length > 0 ? (
                  <ul>
                    {user.purchasedProducts.map((product) => (
                      <li key={product.productId}>
                        <strong>Nombre del Producto:</strong> {product.name}
                        <br />
                        <strong>Precio:</strong> {product.price}€
                        <br />
                        <strong>Fecha de Venta:</strong>{" "}
                        {new Date(product.soldDate).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Este usuario no ha comprado productos.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {loading ? <p>{loading}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
    </section>
  );
}

export default UsersInfo;
