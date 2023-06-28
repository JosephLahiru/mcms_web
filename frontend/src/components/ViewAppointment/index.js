import React, { useState, useEffect } from "react";
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
import { useAppstore } from './../../appStore';

function ViewAppointment() {
  const { dopen } = useAppstore();
  const [appointment, setAppointment] = useState([]);
  const [filteredAppointment, setFilteredAppointment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("NIC");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchAppointment() {
      const response = await fetch("https://mcms_api.mtron.me/get_appointment");
      const data = await response.json();
      setAppointment(data);
      setFilteredAppointment(data);
    }
    fetchAppointment();
  }, []);

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "NIC":
        if (searchTerm.length >= 3) {
          results = appointment.filter((item) =>
            item.nic.includes(searchTerm)
          );
        } else {
          results = appointment;
        }
        break;
      case "Email":
        if (searchTerm.length >= 3) {
          results = appointment.filter((item) =>
            item.email.includes(searchTerm)
          );
        } else {
          results = appointment;
        }
        break;
      case "Contact Number":
        results = appointment.filter((item) =>
          item.contact_num.toString().includes(searchTerm)
        );
        break;
      default:
        results = appointment;
    }
    setFilteredAppointment(results);
  }, [searchTerm, appointment, filterOption]);

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

  const rows = filteredAppointment || [];

  const handleDelete = (id) => {
    setItemToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try{
      await fetch(`https://mcms_api.mtron.me/delete_appointment/${itemToDelete}`, {
        method: "GET",
      });
      setAppointment(appointment.filter((item) => item.app_id !== itemToDelete));
      setFilteredAppointment(
        filteredAppointment.filter((item) => item.app_id !== itemToDelete)
      );
    setItemToDelete(null);
    setConfirmDialogOpen(false);
    toast.success('Appointment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
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
      <Grid container alignItems='center'>
        <Grid item xs={1.5} marginRight={1}>
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
              <MenuItem value="NIC">NIC</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Contact Number">Contact Number</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-size-small"
            size="small"
            value={searchTerm}
            onChange={handleInputChange}
            label={`Search by ${filterOption}...`}
            type="search"
          />
        </Grid>
        <Grid item xs={12}>
          <></>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "black", backgroundColor: "#ce93d8" } }}>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Telephone Number</TableCell>
                  <TableCell>Appointment Type</TableCell>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .filter(item => item.cd_id === "cd_001")
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.app_id}>
                        <TableCell>{item.app_num}</TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell>{item.nic}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.contact_num}</TableCell>
                        <TableCell>{item.at_name}</TableCell>
                        <TableCell>{item.atm_type}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small">Update</Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.app_id)}
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
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "black", backgroundColor: "#ce93d8" } }}>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Telephone Number</TableCell>
                  <TableCell>Appointment Type</TableCell>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .filter(item => item.cd_id === "cd_002")
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.app_id}>
                        <TableCell>{item.app_num}</TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell>{item.nic}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.contact_num}</TableCell>
                        <TableCell>{item.at_name}</TableCell>
                        <TableCell>{item.atm_type}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small">Update</Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.app_id)}
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
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "black", backgroundColor: "#ce93d8" } }}>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Telephone Number</TableCell>
                  <TableCell>Appointment Type</TableCell>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .filter(item => item.cd_id === "cd_003")
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.app_id}>
                        <TableCell>{item.app_num}</TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell>{item.nic}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.contact_num}</TableCell>
                        <TableCell>{item.at_name}</TableCell>
                        <TableCell>{item.atm_type}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small">Update</Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.app_id)}
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
      <ToastContainer />
    </Paper>
  );
}

export default ViewAppointment;
