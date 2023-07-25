import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  IconButton,
  TablePagination,
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
import { useAppstore } from './../../../appStore';

function ViewDoctors() {
  const { dopen } = useAppstore();
  const Navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Doctor Name");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch("https://mcms_api.mtron.me/get_channelling_doctors");
      const data = await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
    }
    fetchDoctors();
  }, []);

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Doctor Name":
        if (searchTerm.length >= 3) {
          results = doctors.filter((item) =>
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          results = doctors;
        }
        break;
      case "Doctor Type":
        if (searchTerm.length >= 3) {
          results = doctors.filter((item) =>
            item.d_type.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          results = doctors;
        }
        break;
      case "Email":
        if (searchTerm.length >= 3) {
          results = doctors.filter((item) =>
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          results = doctors;
        }
        break;
      case "NIC":
        results = doctors.filter((item) =>
          item.nic.toString().includes(searchTerm)
        );
        break;
      default:
        results = doctors;
    }
    setFilteredDoctors(results);
  }, [searchTerm, doctors, filterOption]);

  useEffect(() => {
    setSearchTerm("");
  }, [filterOption]);

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

  const rows = filteredDoctors || [];

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try{
      await fetch(`https://mcms_api.mtron.me/delete_channelling_doctor/${itemToDelete}`, {
        method: "GET",
      });
      setDoctors(doctors.filter((item) => item.cd_id !== itemToDelete));
      setFilteredDoctors(
        filteredDoctors.filter((item) => item.cd_id !== itemToDelete)
      );
    setItemToDelete(null);
    setConfirmDialogOpen(false);
    toast.success('Channelling doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to channelling delete doctor');
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleUpdate = (item) => {
    console.log(item.cd_id);
    Navigate(`/update_doctors/${item.cd_id}`);
  };

  return (
    <Paper
      sx={{
        width: dopen ? "calc(100% - 260px)" : "94%",
        marginLeft: dopen ? "250px" : "80px",
        marginTop: '50px',
        overflow: "hidden",
        padding: "10px",
        transition: "width 0.7s ease",
      }}
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom >
            View Doctors
          </Typography>
            <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl sx={{ minWidth: "120px", width: "100%" }}>
            <InputLabel id="filterSelectLabel" color="secondary">Filter by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              size="small"
              color="secondary"
              value={filterOption}
              label="Filter option"
              onChange={handleFilterChange}
            >
              <MenuItem value="Doctor Name">Doctor Name</MenuItem>
              <MenuItem value="Doctor Type">Doctor Type</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="NIC">NIC</MenuItem>
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey" } }}>
                  <TableCell>Doctor ID</TableCell>
                  <TableCell>Doctor Name</TableCell>
                  <TableCell>Doctor Type</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.cd_id}>
                        <TableCell>{item.cd_id}</TableCell>
                        <TableCell>{item.doctor_name}</TableCell>
                        <TableCell>{item.d_type}</TableCell>
                        <TableCell>{item.nic}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.contact_no}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={() => handleUpdate(item)}>Update</Button>
                        </TableCell>
                        <TableCell>
                        <IconButton
                          aria-label="delete"
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(item.cd_id)}
                        >
                        <DeleteIcon />
                        </IconButton>

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
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <div id="alert-dialog-description">
                  Are you sure you want to remove this doctor?
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
      <ToastContainer />
    </Paper>
  );
}

export default ViewDoctors;
