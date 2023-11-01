// SalesInfoPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { getSalesInfoService } from "../services/index";
import { AuthContext } from "../context/AuthContext";

function SalesInfoPage() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getSalesInfoService({ token, year, month });
      if (response.status === "OK") {
        console.log(response.data, "soy res");
        setSalesData(response.data);
        setError("");
      } else {
        setSalesData([]);
        setError("No se encontraron ventas para estas fechas.");
      }
    } catch (error) {
      setSalesData([]);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Información de Ventas</h1>
      <p>Selecciona un mes o una fecha para filtrar las ventas</p>
      <div>
        <label>Año:</label>
        <input
          type="number" // Cambia el tipo de input a number
          placeholder="Año"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>Mes:</label>
        <input
          type="number" // Cambia el tipo de input a number
          placeholder="Mes"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Filtrar</button>
      {salesData.length > 0 ? (
        <div>
          <h2>Información de Venta</h2>
          <table className="t-ventas">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Comprador</th>
                <th>Fecha de Venta</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.productName}</td>
                  <td>{sale.name}</td>
                  <td>{new Date(sale.soldDate).toLocaleDateString()}</td>
                  <td>{sale.price}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se ha realizado ninguna venta</p>
      )}
      {loading && <p>Cargando resultados...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SalesInfoPage;
