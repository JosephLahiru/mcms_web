import React, { useState ,useEffect } from "react";
import './main.css';
 
function ViewLowStock() {
  const [lowstock, setLowStock] = useState([]);
  const [filteredLowStock, setFilteredLowStock] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchLowStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_stock_low");
      const data = await response.json();
      setLowStock(data);
      setFilteredLowStock(data);
    }
    fetchLowStock();
  }, []);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    if (event.target.value === "") {
      setFilteredLowStock(lowstock);
    } else {
    const filteredData = lowstock.filter((item) => item.stock_type === Number(event.target.value));
    setFilteredLowStock(filteredData);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredLowStock.length / rowsPerPage);
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const hasPrevPage = page > 0;
  const hasNextPage = page < totalPages - 1;

  return (
    <div className="low-stock-main-container">
      <h1>View Low Stock</h1>
      <div className="view-low-stock-filter">
        <label className="view-low-stock-label" htmlFor="filterSelect">Filter by stock type:</label>
        <select id="filterSelect" value={filterOption} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="1">Small</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Drug ID</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Drug Type</th>
            <th scope="col">Unit Price(Rs)</th>
            <th scope="col">Selling Price(Rs)</th>
            <th scope="col">Quantity</th>
            <th scope="col">Manufacture Date</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Total Ac Price(Rs)</th>
            <th scope="col">Total Sell Price(Rs)</th>
          </tr>
        </thead>
        <tbody>
          {filteredLowStock.slice(start, end).map((item) => (
            <tr key={item.prdct_id}>
              <td>{item.prdct_id}</td>
              <td>{item.prdct_name}</td>
              <td>{item.brand_name}</td>
              <td>{item.med_type}</td>
              <td>{item.ac_price}</td>
              <td>{item.sell_price}</td>
              <td>{item.total_quantity}</td>
              <td>{item.mfd_date.slice(0, 10)}</td>
              <td>{item.exp_date.slice(0, 10)}</td>
              <td>{item.total_quantity_ac_price}</td>
              <td>{item.total_quantity_sell_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item${!hasPrevPage ? ' disabled' : ''}`}>
          <button className="page-link" disabled={!hasPrevPage} onClick={handlePrevPage}>Prev</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item${page === index ? ' active' : ''}`}>
            <button className="page-link" onClick={() => setPage(index)}>{index + 1}</button>
          </li>
        ))}
        <li className={`page-item${!hasNextPage ? ' disabled' : ''}`}>
          <button className="page-link" disabled={!hasNextPage} onClick={handleNextPage}>Next</button>
          </li>
        </ul>
      </nav>
        </div>
    );
}

export default ViewLowStock;