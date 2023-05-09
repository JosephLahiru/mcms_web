import React, { useState ,useEffect } from "react";
import './main.css';
 
function ViewLowStock() {
  const [lowstock, setLowStock] = useState([]);
  const [filteredLowStock, setFilteredLowStock] = useState([]);
  const [filterOption, setFilterOption] = useState("1");
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

  // useEffect(() => {
  //   let results;
  //   switch (filterOption) {
  //     case "1":
  //       results = lowstock.filter(item => item.stock_type === "1");
  //       break;
  //     case "2":
  //       results = lowstock.filter(item => item.stock_type === "2");
  //       break;
  //     case "3":
  //       results = lowstock.filter(item => item.stock_type === "3");
  //       break;
  //     default:
  //       results = lowstock;
  //       break;
  //   }
  //   setFilteredLowStock(results);
  // }, [lowstock, filterOption]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const rowsPerPage = 10;
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;

  return (
    <div className="low-stock-main-container">
      <h1>View Low Stock</h1>
      <div className="view-low-stock-filter">
        <label className="view-low-stock-label" htmlFor="filterSelect">Filter by stock type:</label>
        <select id="filterSelect" value={filterOption} onChange={handleFilterChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Drug ID</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Drug Type</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Selling Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Manufacture Date</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Total Ac Price</th>
            <th scope="col">Total Sell Price</th>
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
      <div className="pagination">
        <button className="btn btn-primary" disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button className="btn btn-primary" disabled={end >= filteredLowStock.length} onClick={handleNextPage}>Next</button>
      </div>
        </div>
    );
}

export default ViewLowStock;