import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AddToCart from "./AddToCart";
import RemoveToMyCart from "./RemoveToMyCart";
import { AuthContext } from "../context/AuthContext";
import DeleteProduct from "./DeleteProduct";

function ProductsList({ products }) {
  const location = useLocation();
  const { cartCount, setCartCount, role } = useContext(AuthContext);

  const [productList, setProductList] = useState([]);

  const removeProductfromCart = (productId) => {
    setProductList((products) =>
      products.filter((product) => product.productId !== productId)
    );
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const displayProducts =
    location.pathname.includes("/mycart") && productList.length
      ? productList
      : products;

  return (
    <div className="product-list">
      {displayProducts.map((product, index) => (
        <div
          key={product.productId || index}
          className="product"
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          <Link to={`/products/${product.productId}`}>
            {product.photos.length > 0 ? (
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/photos/${
                  product.name
                }/${product.photos[0].photo}`}
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
          <p>
            {location.pathname.includes("/mycart")
              ? `Guardado el: ${new Date(product.date).toLocaleDateString()}`
              : `Publicado el: ${new Date(product.date).toLocaleDateString()}`}
          </p>
          <Link to={`/products/${product.productId}`}>
            <button>Ver Producto</button>
          </Link>
          {!location.pathname.includes("/mycart") && (
            <>
              <AddToCart
                productId={product.productId}
                onAddToCart={() => updateCartCount(cartCount + 1)}
              />
              {role == "admin" && (
                <DeleteProduct productId={product.productId} />
              )}
            </>
          )}
          {location.pathname.includes("/mycart") && (
            <RemoveToMyCart
              productId={product.productId}
              onRemove={() => {
                removeProductfromCart(product.productId);
                updateCartCount(cartCount - 1);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
