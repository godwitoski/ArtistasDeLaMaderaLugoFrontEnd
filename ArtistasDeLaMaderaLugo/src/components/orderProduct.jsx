import React, { useState, useEffect, useContext } from "react";
import { getMyUserCartService, orderProductsService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function OrderProduct() {
  const [products, setProducts] = useState([]);
  const { token, name, emailAuth, phone, address, setCartCount, cartCount } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: name,
    email: emailAuth,
    address: address,
    phone: phone,
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const cartData = await getMyUserCartService(token);
        setCartProducts(cartData.products);
        setProducts(cartData.products);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchProductList();
  }, [token]);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      productIds: selectedProducts,
    };

    try {
      const response = await orderProductsService({
        formData: dataToSend,
        token,
      });

      if (response.status === "OK") {
        setMessage(response.message);

        setTimeout(() => {
          navigate("/user/myorders");
          setCartCount(cartCount);
        }, 3000);
      } else {
        setError("No se pudo realizar el pedido.");
      }
    } catch (error) {
      if (
        error.message ==
        "Este producto ya ha sido enviado y está pendiente de revisión."
      ) {
        setError(error.message);
      } else {
        setError("No se pudo realizar el pedido.");
      }
      setTimeout(() => {
        setCartProducts(products);
        navigate("/user/mycart");
      }, 2000);
    }
  };

  return (
    <div className="orderProduct">
      <h1>Selecciona los productos que deseas comprar</h1>
      <form className="order-product-form" onSubmit={handleSubmit}>
        <div className="contact-order">
          <h3> Datos de contacto </h3>
          <fieldset>
            <label htmlFor="name">Nombre de contacto:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email de contacto:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="address">Dirección de envío:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Teléfono de contacto:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </fieldset>
        </div>
        {cartProducts &&
          cartProducts.map((product) => (
            <div key={product.productId} className="product-list">
              <div className="product-order">
                <label>
                  <input
                    type="checkbox"
                    name={`product-${product.id}`}
                    checked={selectedProducts.includes(product.productId)}
                    onChange={() => handleCheckboxChange(product.productId)}
                  />
                  <Link to={`/products/${product.productId}`}>
                    {product.photos.length > 0 ? (
                      <img
                        src={`${
                          import.meta.env.VITE_APP_BACKEND
                        }/uploads/photos/${product.name}/${
                          product.photos[0].photo
                        }`}
                        alt={product.name}
                      />
                    ) : (
                      <p>Sin fotos</p>
                    )}
                  </Link>
                  <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="p-description">
                      Descripción: {product.description}
                    </p>
                    <p className="p-price">Precio: {product.price}€</p>
                    <p className="p-material">Material: {product.type}</p>
                  </div>
                </label>
              </div>
            </div>
          ))}
        <div>
          <button type="submit">Realizar Pedido</button>
        </div>
      </form>
      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
    </div>
  );
}

export default OrderProduct;
