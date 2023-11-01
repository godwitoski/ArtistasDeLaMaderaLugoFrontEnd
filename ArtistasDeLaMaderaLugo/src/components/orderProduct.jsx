import React, { useState, useEffect, useContext } from "react";
import { getMyUserCartService, orderProductsService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function OrderProduct() {
  const [products, setProducts] = useState([]);
  const { token, name, emailAuth, phone, address } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: name,
    email: emailAuth,
    address: address,
    phone: phone,
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const cartData = await getMyUserCartService(token);
        setProducts(cartData.products);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchProductList();
  }, []);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      console.log(selectedProducts, "soy selected");
      console.log(productId, "soy el id");
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
      } else {
        setError("No se pudo realizar el pedido.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Selecciona los productos que deseas comprar</h1>
      <form onSubmit={handleSubmit}>
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
        {products.map((product) => (
          <div className="product-list">
            <div key={product.productId} className="product-order">
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
                <h2>Producto: {product.name}</h2>
                <p>Descripción: {product.description}</p>
                <p>Precio: {product.price}€</p>
                <p>Material: {product.type}</p>
              </label>
            </div>
          </div>
        ))}
        <div>
          <button type="submit">Realizar Pedido</button>
        </div>
      </form>
      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p>{message}</p> : null}
    </div>
  );
}

export default OrderProduct;
