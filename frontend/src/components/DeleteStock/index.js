import React, { useState, useEffect } from "react";
import './main.css';

function DeleteStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Drug Name");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_stock");
      const data = await response.json();
      setStock(data);
      setFilteredStock(data);
    }
    fetchStock();
  }, []);

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Drug Name":
        results = stock.filter((item) =>
          item.prdct_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "Drug Type":
        results = stock.filter((item) =>
          item.med_type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "Quantity":
        results = stock.filter((item) =>
          item.total_quantity.toString().includes(searchTerm)
        );
        break;
      default:
        results = stock;
    }
    setFilteredStock(results);
  }, [searchTerm, stock, filterOption]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleDelete = async (id) => {
    await fetch(`https://mcms_api.mtron.me/delete_stock/${id}`, { method: "DELETE" });
    setStock(stock.filter((item) => item.prdct_id !== id));
    setFilteredStock(filteredStock.filter((item) => item.prdct_id !== id));
  };


  const rowsPerPage = 10;
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;

  return (
    <div className="delete-stock-table-container">
      <h1>delete Stock</h1>
      <div className="delete-stock-filter">
        <div className="delete-stock-search-filter">
          <label className="delete-stock-label" htmlFor="filterSelect">Search by</label>
          <select id="filterSelect" value={filterOption} onChange={handleFilterChange}>
            <option value="Drug Name">Drug Name</option>
            <option value="Drug Type">Drug Type</option>
            <option value="Quantity">Quantity</option>
          </select>
        </div>
        <div className="delete-stock-search-input">
          <input type="search" class="form-control form-control-sm" value={searchTerm} onChange={handleInputChange} placeholder={`Search by ${filterOption}...`} />
        </div>
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
            <th scope="col">Deletion</th>
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
              <td>{item.mfd_date.slice(0, 10)}</td>
              <td>{item.exp_date.slice(0, 10)}</td>
              <td><button className="btn btn-primary" onClick={() => handleDelete(item.prdct_id)}>delete</button></td>
              {/* <td>{item.total_quantity_ac_price}</td>
              <td>{item.total_quantity_sell_price}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="btn btn-primary" disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button className="btn btn-primary" disabled={end >= filteredStock.length} onClick={handleNextPage}>Next</button>
      </div>
      </div>
  );
}

export default DeleteStock;
