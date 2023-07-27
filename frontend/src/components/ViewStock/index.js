import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppstore } from "./../../appStore";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'prdct_id', headerName: 'Drug ID', flex: 0.8 },
  { field: 'prdct_name', headerName: 'Drug Name', flex: 1 },
  { field: 'brand_name', headerName: 'Brand Name', flex: 1 },
  { field: 'med_type', headerName: 'Drug Type', flex: 0.8 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'ac_price', headerName: 'Unit Price(Rs)', flex: 1 },
  { field: 'sell_price', headerName: 'Selling Price(Rs)', flex: 1 },
  { field: 'total_quantity', headerName: 'Quantity', flex: 1 },
  { field: 'stock_type', headerName: 'Stock Type', flex: 1 },
  {
    field: 'mfd_date',
    headerName: 'Manufactured Date',
    flex: 1,
    valueGetter: (params) => params.row.mfd_date.slice(0, 10), // Slice to get only the date part
  },
  {
    field: 'exp_date',
    headerName: 'Expiry Date',
    flex: 1,
    valueGetter: (params) => params.row.exp_date.slice(0, 10), // Slice to get only the date part
  },
  { field: 'actions', headerName: '', flex: 1.5, renderCell: (params) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => params.row.handleUpdate(params.row)}
      >
        Update
      </Button>
      <IconButton
        aria-label="delete"
        variant="outlined"
        size="small"
        onClick={() => params.row.handleDelete(params.row.prdct_id)}
        style={{ marginLeft: '20px' }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )},
];

function ViewStock() {
  const { dopen } = useAppstore();
  const Navigate = useNavigate();
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Drug Name");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [reason1Checked, setReason1Checked] = useState(false);
  const [reason2Checked, setReason2Checked] = useState(false);

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

  useEffect(() => {
    setSearchTerm(""); // Empty the search term when the filter option changes
  }, [filterOption]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (reason1Checked || reason2Checked) {
      try {
        await fetch(`https://mcms_api.mtron.me/delete_stock/${itemToDelete}`, {
          method: "GET",
        });
        setStock(stock.filter((item) => item.prdct_id !== itemToDelete));
        setFilteredStock(
          filteredStock.filter((item) => item.prdct_id !== itemToDelete)
        );
        setReason1Checked(false);
        setReason2Checked(false);
        setItemToDelete(null);
        setConfirmDialogOpen(false);
        toast.success("Drug deleted successfully");
      } catch (error) {
        toast.error("Failed to delete drug");
      }
    } else {
      toast.error("Please select a reason");
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleUpdate = (item) => {
    console.log(item.prdct_id);
    Navigate(`/update_stock/${item.prdct_id}`);
  };

  return (
    <Paper
      sx={{
        width: dopen ? "calc(100% - 260px)" : "94%",
        marginLeft: dopen ? "250px" : "80px",
        marginTop: "50px",
        overflow: "hidden",
        padding: "10px",
        transition: "width 0.0s ease",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            View Stock
          </Typography>
          <hr style={{ margin: "10px 0" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl sx={{ minWidth: "120px", width: "100%" }}>
            <InputLabel id="filterSelectLabel" color="secondary">
              Filter by
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              size="small"
              color="secondary"
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
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="outlined-size-small"
            size="small"
            color="secondary"
            value={searchTerm}
            onChange={handleInputChange}
            label={`Search by ${filterOption}...`}
            type="search"
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 440 }}>
            <DataGrid
              rows={filteredStock.map((item) => ({
                ...item,
                id: item.prdct_id,
                handleUpdate: handleUpdate,
                handleDelete: handleDelete,
              }))}
              columns={columns}
              pageSize={10}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
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
                  Are you sure you want to delete this stock ?
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={reason1Checked}
                      onChange={() => setReason1Checked(!reason1Checked)}
                    />
                    &nbsp;Damaged packaging
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={reason2Checked}
                      onChange={() => setReason2Checked(!reason2Checked)}
                    />
                    &nbsp;Other reason
                  </label>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button
                  onClick={handleConfirmDelete}
                  autoFocus
                  disabled={!reason1Checked && !reason2Checked}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </Paper>
  );
}

export default ViewStock;
