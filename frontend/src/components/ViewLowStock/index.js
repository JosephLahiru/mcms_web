import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl
} from "@mui/material";

function ViewLowStock() {
  const [lowstock, setLowStock] = useState([]);
  const [filteredLowStock, setFilteredLowStock] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [page, setPage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      const filteredData = lowstock.filter((item) => item.expire_type === Number(event.target.value));
      setFilteredLowStock(filteredData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = filteredLowStock || [];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px', margin: '5% auto' }}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label">Filter option</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filterOption}
              label="Filter option"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={1}>Small stock</MenuItem>
              <MenuItem value={2}>Medium stock</MenuItem>
              <MenuItem value={3}>Big stock</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color:"White", backgroundColor: "grey" }}}>
                  <TableCell>Drug ID</TableCell>
                  <TableCell>Drug Name</TableCell>
                  <TableCell>Brand Name</TableCell>
                  <TableCell>Drug Type</TableCell>
                  <TableCell>Unit Price(Rs)</TableCell>
                  <TableCell>Selling Price(Rs)</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Manufacture Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Total Ac Price(Rs)</TableCell>
                  <TableCell>Total Sell Price(Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ?(
                  rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow hover role="checkbox" key={item.prdct_id}>
                      <TableCell>{item.prdct_id}</TableCell>
                      <TableCell>{item.prdct_name}</TableCell>
                      <TableCell>{item.brand_name}</TableCell>
                      <TableCell>{item.med_type}</TableCell>
                      <TableCell>{item.ac_price}</TableCell>
                      <TableCell>{item.sell_price}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      <TableCell>{item.mfd_date.slice(0, 10)}</TableCell>
                      <TableCell>{item.exp_date.slice(0, 10)}</TableCell>
                      <TableCell>{item.total_quantity_ac_price}</TableCell>
                      <TableCell>{item.total_quantity_sell_price}</TableCell>
                      </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10}>No data available</TableCell>
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

export default ViewLowStock;
