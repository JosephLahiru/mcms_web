import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  TablePagination,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


function ViewStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Drug Name");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Drug Name":
        if (searchTerm.length >= 3) {
          results = stock.filter((item) =>
            item.prdct_name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          results = stock;
        }
        break;
      case "Drug Type":
        if (searchTerm.length >= 3) {
          results = stock.filter((item) =>
            item.med_type.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          results = stock;
        }
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = filteredStock || [];

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      await fetch(`https://mcms_api.mtron.me/delete_stock/${itemToDelete}`, {
        method: "GET",
      });
      setStock(stock.filter((item) => item.prdct_id !== itemToDelete));
      setFilteredStock(
        filteredStock.filter((item) => item.prdct_id !== itemToDelete)
      );
    }
    setItemToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
      <Grid container alignItems='center'>
        <Grid item xs={1.5}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="filterSelectLabel">Filter by</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            size="small"
            value={filterOption}
            label="Filter option"
            onChange={handleFilterChange}
          >
            <MenuItem value="Drug Name">Drug Name</MenuItem>
            <MenuItem value="Drug Type">Drug Type</MenuItem>
            <MenuItem value="Quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField id="outlined-size-small" size="small" value={searchTerm} onChange={handleInputChange} label={`Search by ${filterOption}...`} type="search" />
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
                <TableCell>Description</TableCell>
                <TableCell>Unit Price(Rs)</TableCell>
                <TableCell>Selling Price(Rs)</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Manufacture Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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
                      <TableCell>{item.brand_name}</TableCell>
                      <TableCell>{item.med_type}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.ac_price}</TableCell>
                      <TableCell>{item.sell_price}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      <TableCell>{item.mfd_date.slice(0, 10)}</TableCell>
                      <TableCell>{item.exp_date.slice(0, 10)}</TableCell>
                      <TableCell><Button variant="outlined" size="small" >Update</Button></TableCell>
                      <TableCell><Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={() => handleDelete(item.prdct_id)}>Delete</Button></TableCell>
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
        {itemToDelete && (
            <Dialog
              open={confirmDialogOpen}
              onClose={handleCancelDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <div id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>Delete</Button>
              </DialogActions>
            </Dialog>
          )}
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

export default ViewStock;
