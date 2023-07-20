import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  TablePagination,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function ViewStockForBill() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_stock");
      const data = await response.json();
      setStock(data);
      setFilteredStock(data);
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
      setPage(0);
    } else {
      // If the search term is less than 3 characters, reset the filtered data to display all stock data.
      setFilteredStock(stock);
    }
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = filteredStock || [];

  return (
    <Paper
      sx={{
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom >
            View Stock
          </Typography>
            <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="outlined-size-small"
            size="small"
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
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey" } }}>
                  <TableCell>Drug ID</TableCell>
                  <TableCell>Drug Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.prdct_id}>
                        <TableCell>{item.prdct_id}</TableCell>
                        <TableCell>{item.prdct_name}</TableCell>
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ViewStockForBill;
