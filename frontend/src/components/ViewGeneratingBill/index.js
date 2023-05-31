import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewStock() {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_billdetails");
      const data = await response.json();
      setStock(data);
      setFilteredStock(data);
    }
    fetchStock();
  }, []);

  // useEffect(() => {
  //   const results = stock.filter((item) =>
  //     item.prdct_name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredStock(results);
  // }, [searchTerm, stock]);

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
      <Grid container alignItems="center">
        <h1>Issued Billing Details</h1>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey" } }}>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Id</TableCell>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>Selected Doctor</TableCell>
                  <TableCell>Doctor Charge</TableCell>
                  <TableCell>Drug Id</TableCell>
                  <TableCell>Drug Name</TableCell>
                  <TableCell>Unit Price(Rs)</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Discount(%)</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.inv_num}>
                        <TableCell>{item.inv_date}</TableCell>
                        <TableCell>{item.inv_id}</TableCell>
                        <TableCell>{item.app_num}</TableCell>
                        <TableCell>{item.selected_doctor}</TableCell>
                        <TableCell>{item.doctor_charge}</TableCell>
                        <TableCell>{item.drug_name}</TableCell>
                        <TableCell>{item.drug_id}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit_price}</TableCell>
                        <TableCell>{item.discount}</TableCell>
                        <TableCell>{item.total_amount}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small">
                            Update
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.prdct_id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
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
              <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
              <DialogContent>
                <div id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>
                  Delete
                </Button>
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
    </Paper>
  );
}

export default ViewStock;
