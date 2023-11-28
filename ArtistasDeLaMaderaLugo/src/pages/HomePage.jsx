import React, { useState, useEffect } from "react";
import { getProducts } from "../services/index";
import ProductsList from "../components/ProductsList";
import { Link } from "react-router-dom";
import TokenCaducado from "../components/TokenCaducado";
import { useProducts } from "../hooks/useProducts";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Cargando...");
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { tokenCaducadoVisible, setTokenCaducadoVisible } = useProducts();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        console.log(fetchedProducts, "el fetch");
        if (fetchedProducts) {
          setProducts(fetchedProducts);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (
      !products[currentProductIndex] ||
      !products[currentProductIndex].photos ||
      products[currentProductIndex].photos.length === 0
    ) {
      return;
    }

    const productInterval = setInterval(nextProduct, 2000);

    return () => {
      clearInterval(productInterval);
    };
  }, [currentProductIndex, products]);

  useEffect(() => {
    if (
      !products[currentProductIndex] ||
      !products[currentProductIndex].photos ||
      products[currentProductIndex].photos.length === 0
    ) {
      return;
    }

    const imageInterval = setInterval(nextSlide, 2000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [currentImageIndex, products]);

  const nextProduct = () => {
    setCurrentProductIndex((currentProductIndex + 1) % products.length);
    setCurrentImageIndex(0);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      currentProductIndex === 0 ? products.length - 1 : currentProductIndex - 1
    );
    setCurrentImageIndex(0);
  };

  const nextSlide = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) % products[currentProductIndex].photos.length
    );
  };

  console.log(products);

  return (
    <section className="home-page">
      {products.length ? (
        <>
          <div className="home-content">
            <div className="latest-products">
              {products.slice(0, 2).map((product) => (
                <div className="product-card" key={product.productId}>
                  <Link
                    key={product.productId}
                    to={`/products/${product.productId}`}
                  >
                    {product.photos && product.photos.length > 0 ? (
                      <img
                        src={`${
                          import.meta.env.VITE_APP_BACKEND
                        }/uploads/photos/${product.name}/${
                          product.photos[0].photo
                        }`}
                        alt={product.name}
                      />
                    ) : (
                      <div>No hay imágenes disponibles</div>
                    )}
                  </Link>
                  <h2 className="new-product-name">{product.name}</h2>
                  <p className="new-product-price">{product.price}€</p>
                  <p className="new-product">Nuevo</p>
                </div>
              ))}
            </div>
            <div className="carousel-container">
              {products[currentProductIndex] &&
              products[currentProductIndex].photos &&
              products[currentProductIndex].photos.length > 0 ? (
                <>
                  <button
                    onClick={prevProduct}
                    className="carousel-button left"
                  >
                    &#8249;
                  </button>
                  <Link
                    to={`/products/${products[currentProductIndex].productId}`}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_APP_BACKEND
                      }/uploads/photos/${products[currentProductIndex].name}/${
                        products[currentProductIndex].photos[currentImageIndex]
                          .photo
                      }`}
                      alt={`Slide ${currentImageIndex}`}
                    />
                  </Link>
                  <button
                    onClick={nextProduct}
                    className="carousel-button right"
                  >
                    &#8250;
                  </button>
                </>
              ) : null}
            </div>
          </div>

          <h1>Bienvenidos a La naturaleza como arte</h1>
          <ProductsList
            tokenCaducadoVisible={tokenCaducadoVisible}
            setTokenCaducadoVisible={setTokenCaducadoVisible}
            products={products.slice(2)}
          />
        </>
      ) : (
        <p>No se encontraron publicaciones recientes</p>
      )}
      {error ? <p className="error-message">{error}</p> : null}
      {loading ? <p>{loading}</p> : null}
      {tokenCaducadoVisible && <TokenCaducado />}
    </section>
  );
};
