import { useContext, useEffect, useState } from "react";
import { getUsersService } from "../services";
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
    <section>
      {users.length > 0 ? (
        <div>
          <h1>Información de Usuarios</h1>
          {users.map((user) => (
            <div key={user.id}>
              <h2>Usuario: {user.username}</h2>
              <p>Nombre: {user.name}</p>
              <p>Correo Electrónico: {user.email}</p>
              <p>Rol: {user.role}</p>
              <p>
                Teléfono:{" "}
                {user.phone ? user.phone : "No tiene teléfono añadido"}
              </p>
              <p>
                Dirección:{" "}
                {user.address ? user.address : "Aún no ha añadido dirección"}
              </p>
              <h3>Productos Vendidos:</h3>
              {user.purchasedProducts.length > 0 ? (
                <ul>
                  {user.purchasedProducts.map((product) => (
                    <li key={product.productId}>
                      Nombre del Producto: {product.name}
                      <br />
                      Precio: {product.price}€
                      <br />
                      Fecha de Venta:{" "}
                      {new Date(product.soldDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Este usuario no ha comprado productos.</p>
              )}
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
