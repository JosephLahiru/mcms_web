import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
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
import { useAppstore } from './../../appStore';

function ViewLowStock() {
  const { dopen } = useAppstore();
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
      const filteredData = lowstock.filter((item) => item.stock_type === Number(event.target.value));
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
    <Paper sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '50px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
      <Grid container alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom >
            View Low Stock
          </Typography>
            <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label" color="secondary">Filter option</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              color="secondary"
              value={filterOption}
              label="Filter option"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={1}>Essential meds</MenuItem>
              <MenuItem value={2}>Standard Inventory</MenuItem>
              <MenuItem value={3}>bulk supplies</MenuItem>
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
                  <TableCell>Manufacture Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Quantity</TableCell>
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
                      <TableCell>{item.mfd_date.slice(0, 10)}</TableCell>
                      <TableCell>{item.exp_date.slice(0, 10)}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11}>No data available</TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredLowStock.length}
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
