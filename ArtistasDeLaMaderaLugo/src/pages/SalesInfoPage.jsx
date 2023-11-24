import React, { useState, useEffect, useContext } from "react";
import { getSalesInfoService } from "../services/index";
import { AuthContext } from "../context/AuthContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useProducts } from "../hooks/useProducts";
import TokenCaducado from "../components/TokenCaducado";

function SalesInfoPage() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { tokenCaducadoVisible, setTokenCaducadoVisible } = useProducts();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getSalesInfoService({ token, year, month });
      if (response.status === "OK") {
        setSalesData(response.data);
        setError("");
      } else {
        setSalesData([]);
        setError("No se encontraron ventas para estas fechas.");
      }
    } catch (error) {
      if (error.message === "Token Caducado") {
        setTokenCaducadoVisible(true);
      }
      setSalesData([]);
      setError(error.message);
    }
    setLoading(false);
  };

  const getTotalSales = () => {
    return salesData
      .reduce((total, sale) => total + parseFloat(sale.price), 0)
      .toFixed(2);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      head: [["Producto", "Comprador", "Fecha de Venta", "Precio"]],
      body: salesData.map((sale) => [
        sale.productName,
        sale.name,
        new Date(sale.soldDate).toLocaleDateString(),
        `${sale.price}€`,
      ]),
    });
    pdf.autoTable({
      body: [["Total de Ventas", "", "", `${getTotalSales()}€`]],
    });
    pdf.save("ventas.pdf");
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="sales-info-page">
      <h1>Información de Ventas</h1>
      <div className="filter-data">
        <p>Escribe un mes o una fecha para filtrar las ventas</p>
        <div>
          <label>Año:</label>
          <input
            type="number"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label>Mes:</label>
          <input
            type="number"
            placeholder="Mes"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Filtrar</button>
      </div>
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
          <p>Total de Ventas: {getTotalSales()}€</p>
          <button onClick={generatePDF}>Generar PDF</button>
        </div>
      ) : (
        <p>No se ha realizado ninguna venta</p>
      )}
      {loading && <p>Cargando resultados...</p>}
      {error && <p className="error-message">{error}</p>}
      {tokenCaducadoVisible && <TokenCaducado />}
    </div>
  );
}

export default SalesInfoPage;
