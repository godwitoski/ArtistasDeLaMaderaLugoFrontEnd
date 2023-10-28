import { useEffect, useState } from "react";
import { getProducts } from "../services";
import ProductsList from "../components/productsList";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await getProducts();
      try {
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      return products;
    };
    getAllProducts();
  }, [products.length]);

  console.log(products);
  return (
    <section>
      <h1>Bienvenido a Artistas de la madera</h1>
      <ProductsList products={products} />
      {loading ? <p>{loading}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
    </section>
  );
};
