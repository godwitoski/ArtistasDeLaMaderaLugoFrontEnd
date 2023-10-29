import React, { useState, useEffect, useContext } from "react";
import { getMyOrdersService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const ordersData = await getMyOrdersService(token);
        setOrders(ordersData.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div>
      <h1>Mis Pedidos</h1>
      {loading ? <p>Cargando Pedidos...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h2>Producto: {order.name}</h2>
              <p>Precio: {order.price}€</p>
              <p>
                Fecha del pedido:{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                Estado:{" "}
                {order.cancelled
                  ? "Cancelado"
                  : order.ordered
                  ? "Pendiente"
                  : "Enviado"}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default MyOrders;
