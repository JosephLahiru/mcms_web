import React, { useState, useEffect } from "react";
import './main.css';

function ViewStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("http://158.101.10.103/get_stock");
      const data = await response.json();
      setStock(data);
      setFilteredStock(data);
    }
    fetchStock();
  }, []);

  useEffect(() => {
    const results = stock.filter((item) =>
      item.prdct_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStock(results);
  }, [searchTerm, stock]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
    <div className="div1">
      <h1>View Stock</h1>
      <div className="filter">
        <label htmlFor="drugSearch">Search by <select class="form-control form-control-sm"><option>Drug Name</option><option>Drug type</option><option>Quantity</option></select></label>
        <input type="text" class="form-control form-control-sm" value={searchTerm} onChange={handleInputChange} placeholder="Search for a drug..."/>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Drug ID</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Drug Type</th>
            <th scope="col">Description</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Selling Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Manufacture Date</th>
            <th scope="col">Expiry Date</th>
            {/* <th scope="col">Total Ac Price</th>
            <th scope="col">Total Sell Price</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredStock.slice(start, end).map((item) => (
            <tr key={item.prdct_id}>
              <td>{item.prdct_id}</td>
              <td>{item.prdct_name}</td>
              <td>{item.brand_name}</td>
              <td>{item.med_type}</td>
              <td>{item.description}</td>
              <td>{item.ac_price}</td>
              <td>{item.sell_price}</td>
              <td>{item.total_quantity}</td>
              <td>{item.mfg_date}</td>
              <td>{item.exp_date}</td>
              {/* <td>{item.total_quantity_ac_price}</td>
              <td>{item.total_quantity_sell_price}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={end >= filteredStock.length} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ViewStock;
