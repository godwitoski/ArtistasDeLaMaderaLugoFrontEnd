import { useState, useEffect } from "react";
import { searchProductService } from "../services/index";
import ProductsList from "../components/ProductsList";

function ProductSearch() {
  const [searchParams, setSearchParams] = useState({ name: "", type: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchParams.name && !searchParams.type) {
      setError("Por favor, ingresa un término de búsqueda.");
      return;
    }

    setLoading(true);
    try {
      const response = await searchProductService(searchParams);
      if (response.status === "OK") {
        setSearchResults(response.products);
        setError("");
      } else {
        setSearchResults([]);
        setError("No se encontraron productos que coincidan con la búsqueda.");
      }
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams.name, searchParams.type]);

  return (
    <div className="searchPage">
      <h1>Buscar Productos</h1>
      <p>Busca algún producto por su nombre o su tipo de material</p>
      <input
        type="text"
        placeholder="Nombre o material del producto"
        value={searchParams.name || searchParams.type}
        onChange={(e) =>
          setSearchParams({
            ...searchParams,
            name: e.target.value,
            type: e.target.value,
          })
        }
      />
      {loading && <p>Cargando resultados...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="search-results">
        {searchResults && <ProductsList products={searchResults} />}
      </div>
    </div>
  );
}

export default ProductSearch;
