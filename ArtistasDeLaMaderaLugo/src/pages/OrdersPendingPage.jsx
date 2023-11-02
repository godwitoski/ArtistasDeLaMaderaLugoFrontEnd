import React, { useContext, useEffect, useState } from "react";
import { getTemporaryOrdersInfo } from "../services/index"; // Importa el servicio adecuado
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ConfirmSales from "../components/ConfirmSales";

function OrdersPendingPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama al servicio para obtener los pedidos pendientes
    const fetchPendingOrders = async () => {
      try {
        const response = await getTemporaryOrdersInfo(token);
        if (response.status === "OK") {
          setOrders(response.products);
        } else {
          setError("No se pudieron cargar los pedidos pendientes.");
        }
      } catch (error) {
        setError("Error en la solicitud.");
      }
    };

    fetchPendingOrders();
  }, [orders.length]);

  return (
    <div>
      <h1>Pedidos pendientes de aceptar</h1>
      {error && <p className="error-message">{error}</p>}
      <table style={{ width: "90vw" }}>
        <thead>
          <tr>
            <th>Pedido el</th>
            <th>Producto</th>
            <th>Foto</th>
            <th>Descripción</th>
            <th>Comprador</th>
            <th>Dirección de envío</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Precio</th>
            <th>Confirmar compra</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.name}</td>
              <td>
                <Link to={`/products/${order.productId}`}>
                  {order.photos.length > 0 ? (
                    <img
                      style={{ width: "100px" }}
                      src={`${
                        import.meta.env.VITE_APP_BACKEND
                      }/uploads/photos/${order.name}/${order.photos[0].photo}`}
                      alt={order.name}
                    />
                  ) : (
                    <p>Sin fotos</p>
                  )}
                </Link>
              </td>
              <td>{order.description}</td>
              <td>{order.user}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{order.email}</td>
              <td>{order.price}€</td>
              <td>
                <ConfirmSales productId={order.productId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPendingPage;
