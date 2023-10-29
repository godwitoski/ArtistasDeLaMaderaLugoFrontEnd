import React from "react";
import { Link } from "react-router-dom";

function ProductsList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.productId}
          className="product"
          style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}
        >
          {" "}
          <Link to={`/products/${product.productId}`}>
            {product.photos.length ? (
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
          <p>Publicado el: {new Date(product.date).toLocaleDateString()}</p>
          <Link to={`/products/${product.productId}`}>
            <button>Ver Producto</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
