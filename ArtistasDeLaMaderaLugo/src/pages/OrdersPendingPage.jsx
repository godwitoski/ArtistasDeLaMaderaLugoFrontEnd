// OrdersPendingPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { getTemporaryOrdersInfo } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ConfirmSales from "../components/ConfirmSales";
import CancelOrder from "../components/CancelOrder";
import { useProducts } from "../hooks/useProducts";
import TokenCaducado from "../components/TokenCaducado";

function OrdersPendingPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [productsUpdated, setProductsUpdated] = useState(false);
  const { tokenCaducadoVisible, setTokenCaducadoVisible } = useProducts();

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await getTemporaryOrdersInfo(token);
        if (response.status === "OK") {
          setOrders(response.products);
        } else {
          setError("No se pudieron cargar los pedidos pendientes.");
          setOrders([]);
        }
      } catch (error) {
        if (error.message === "Token Caducado") {
          setTokenCaducadoVisible(true);
        }
        setError("No se pudieron cargar los pedidos pendientes.");
        setOrders([]);
      }
    };

    fetchPendingOrders();
  }, [token, productsUpdated, productsUpdated.length]);

  const handleProductsUpdated = () => {
    setTimeout(() => {
      setProductsUpdated(!productsUpdated);
    }, 1000);
  };

  return (
    <div className="orders-pending-page">
      <h1>Pedidos pendientes de aceptar</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fecha Pedido</th>
              <th>Producto</th>
              <th>Foto</th>
              <th>Comprador</th>
              <th>Dirección de envío</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Precio</th>
              <th></th>
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
                        src={`${
                          import.meta.env.VITE_APP_BACKEND
                        }/uploads/photos/${order.name}/${
                          order.photos[0].photo
                        }`}
                        alt={order.name}
                      />
                    ) : (
                      <p>Sin fotos</p>
                    )}
                  </Link>
                </td>
                <td>{order.user}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.email}</td>
                <td>{order.price}€</td>
                <td>
                  <div className="buttons-container">
                    <ConfirmSales
                      tokenCaducadoVisible={tokenCaducadoVisible}
                      setTokenCaducadoVisible={setTokenCaducadoVisible}
                      productId={order.productId}
                      onProductsUpdated={handleProductsUpdated}
                    />
                    <CancelOrder
                      tokenCaducadoVisible={tokenCaducadoVisible}
                      setTokenCaducadoVisible={setTokenCaducadoVisible}
                      productId={order.productId}
                      onProductsUpdated={handleProductsUpdated}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay pedidos pendientes</p>
      )}
      {error && <p className="error-message">{error}</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </div>
  );
}

export default OrdersPendingPage;
