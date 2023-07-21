import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

function ViewStockForBill() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_stock");
      const data = await response.json();

      // Sort the data by product name in ascending order (A to Z)
      const sortedData = data.sort((a, b) =>
        a.prdct_name.localeCompare(b.prdct_name)
      );

      setStock(sortedData);
      setFilteredStock(sortedData);
    }

    fetchStock();
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.length >= 3) {
      const filteredData = stock.filter((item) =>
        item.prdct_name.toLowerCase().includes(searchTerm)
      );
      setFilteredStock(filteredData);
    } else {
      // If the search term is less than 3 characters, reset the filtered data to display all stock data.
      setFilteredStock(stock);
    }
  };

  const handleSort = () => {
    const sortedData = [...filteredStock].sort((a, b) =>
      sortDirection === "asc"
        ? a.prdct_name.localeCompare(b.prdct_name)
        : b.prdct_name.localeCompare(a.prdct_name)
    );
    setFilteredStock(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const rows = filteredStock || [];

  return (
    <Paper
      sx={{
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="outlined-size-small"
            size="small"
            fullWidth
            color="secondary"
            value={searchTerm}
            onChange={handleInputChange}
            type="search"
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: "4px" }}>Product ID</TableCell>
                  <TableCell
                    style={{ padding: "4px", cursor: "pointer" }}
                    onClick={handleSort}
                  >
                    Product Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <TableRow hover role="checkbox" key={item.prdct_id}>
                      <TableCell style={{ padding: "4px" }}>
                        {item.prdct_id}
                      </TableCell>
                      <TableCell style={{ padding: "4px" }}>
                        {item.prdct_name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ViewStockForBill;
