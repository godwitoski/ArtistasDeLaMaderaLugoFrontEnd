import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AddToCart from "./AddToCart";
import RemoveToMyCart from "./RemoveToMyCart";
import { AuthContext } from "../context/AuthContext";
import DeleteProduct from "./DeleteProduct";

function ProductsList({
  products,
  tokenCaducadoVisible,
  setTokenCaducadoVisible,
}) {
  const location = useLocation();
  const { cartCount, setCartCount, role } = useContext(AuthContext);

  const [productList, setProductList] = useState([]);

  const removeProductfromCart = (productId) => {
    setProductList((products) =>
      products.filter(
        (product) => parseInt(product.productId) !== parseInt(productId)
      )
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
        <div key={product.productId || index} className="product">
          <div className="product-img">
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
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="p-price"> {product.price}€</p>
            <p className="p-description">
              <strong> Descripción:</strong> {product.description}
            </p>
            <p className="p-material">
              <strong>Material: </strong> {product.type}
            </p>
            <p>
              {location.pathname.includes("/mycart")
                ? `Guardado el: ${new Date(product.date).toLocaleDateString()}`
                : null}
            </p>
            <div className="product-info-buttons">
              <Link to={`/products/${product.productId}`}>
                <button className="seeProduct-button">Ver Producto</button>
              </Link>
              {!location.pathname.includes("/mycart") && (
                <>
                  <AddToCart
                    tokenCaducadoVisible={tokenCaducadoVisible}
                    setTokenCaducadoVisible={setTokenCaducadoVisible}
                    productId={product.productId}
                    onAddToCart={() => updateCartCount(cartCount + 1)}
                  />
                  {role == "admin" && (
                    <DeleteProduct
                      productId={product.productId}
                      tokenCaducadoVisible={tokenCaducadoVisible}
                      setTokenCaducadoVisible={setTokenCaducadoVisible}
                    />
                  )}
                </>
              )}
              {location.pathname.includes("/mycart") && (
                <RemoveToMyCart
                  productId={product.productId}
                  tokenCaducadoVisible={tokenCaducadoVisible}
                  setTokenCaducadoVisible={setTokenCaducadoVisible}
                  onRemove={() => {
                    removeProductfromCart(product.productId);
                    updateCartCount(cartCount - 1);
                  }}
                />
              )}
            </div>
            <h3 className={product.sold ? "sold" : "available"}>
              {product.sold ? "Agotado" : "Disponible"}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
