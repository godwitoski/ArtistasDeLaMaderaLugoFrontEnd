import React, { useState, useEffect, useContext } from "react";
import { getMyOrdersService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, sales, idUser, cancelledProducts } = useContext(AuthContext);

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
  }, [token]);

  const getOrderStatus = (product_id) => {
    const sale = sales.find(
      (sale) => parseInt(sale.product_id) === parseInt(product_id)
    );

    const isCancelledByAdmin = cancelledProducts.some(
      (cancelledProduct) =>
        parseInt(cancelledProduct.product_id) === parseInt(product_id) &&
        parseInt(cancelledProduct.user_id) === parseInt(idUser)
    );

    let status = "";
    let statusText = "";

    if (isCancelledByAdmin) {
      status = "canceled";
      statusText = "Cancelado por el admin";
    } else if (sale) {
      if (parseInt(sale.user_id) === parseInt(idUser)) {
        status = "sold";
        statusText = "Comprado";
      } else {
        status = "canceled";
        statusText = "Cancelado - Ya se ha vendido";
      }
    } else {
      status = "pending";
      statusText = "Pendiente";
    }

    return { status, statusText };
  };

  return (
    <div className="ordersPage">
      <h1>Mis Pedidos</h1>
      {loading ? <p>Cargando Pedidos...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h2>Producto: {order.name}</h2>
              <p className="p-price">Precio: {order.price}€</p>
              <p>
                Fecha del pedido:{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className={getOrderStatus(order.product_id).status}>
                Estado:{" "}
                <span>{getOrderStatus(order.product_id).statusText}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default MyOrders;
