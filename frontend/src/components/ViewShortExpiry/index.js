import React, { useState ,useEffect } from "react";
import './main.css';
 
function ViewShortExpiry() {
  const [shortexpiry, setShortExpiry] = useState([]);
  const [FilteredShortExpiry, setFilteredShortExpiry] = useState(shortexpiry);
  const [filterOption, setFilterOption] = useState("1");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchShortExpiry() {
      const response = await fetch("https://mcms_api.mtron.me/get_expire");
      const data = await response.json();
      setShortExpiry(data);
      setFilteredShortExpiry(data);
    }
    fetchShortExpiry();
  }, []);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    const filteredData = shortexpiry.filter((item) => item.expire_type === event.target.value);
    setFilteredShortExpiry(filteredData);
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
    <div className="short-expiry-main-container">
      <h1>View Short Expiry</h1>
      <div className="view-short-expiry-filter">
        <label className="view-short-expiry-label" htmlFor="filterSelect">Filter by Expire Type:</label>
        <select id="filterSelect" value={filterOption} onChange={handleFilterChange}>
          <option value="short">short</option>
          <option value="medium">medium</option>
          <option value="long">long</option>
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
          {FilteredShortExpiry.slice(start, end).map((item) => (
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
        <button className="btn btn-primary" disabled={end >= FilteredShortExpiry.length} onClick={handleNextPage}>Next</button>
      </div>
        </div>
    );
}

export default ViewShortExpiry;