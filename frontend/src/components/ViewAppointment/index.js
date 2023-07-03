import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
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
  Box,
  Typography,
  ButtonGroup,


} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppstore } from './../../appStore';

function ViewAppointment() {
  const { dopen } = useAppstore();
  const [appointment, setAppointment] = useState([]);
  const [filteredAppointment, setFilteredAppointment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  

  useEffect(() => {
    async function fetchAppointment() {
      const response = await fetch("https://mcms_api.mtron.me/get_appointment");
      const data = await response.json();
      setAppointment(data);
      setFilteredAppointment(data);
    }
    fetchAppointment();
  }, []);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Appointment Number":
        if (searchTerm.length >= 3) {
          results = appointment.filter((item) =>
            item.appointmentNumber.includes(searchTerm)
          );
        } else {
          results = appointment;
        }
        break;
      case "Appointment Date":
        if (searchTerm.length >= 3) {
          results = appointment.filter((item) =>
            item.appointmentDate.includes(searchTerm)
          );
        } else {
          results = appointment;
        }
        break;
      case "Mobile":
        if (searchTerm.length >= 3) {
        results = appointment.filter((item) =>
          item.mobile.includes(searchTerm)
        );
      } else {
        results = appointment;
      }
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
    <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
      <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
        VIEW APPOINTMENT
      </Typography>
      <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px' ,color: 'white'}} />
      <Box
          sx={{
            display: 'flex',
            paddingTop: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
      >
      <ButtonGroup
        color="secondary"
        aria-label="select doctor group"
        sx={{ width: '1100px', height: '70px', gap: '10px', padding: '10px' }}
      >
        <Button
          sx={{
            width: '33.33%',
            fontSize: '18px',
            color: 'white',
            backgroundColor: '#9c27b0',
          }}
          key="NISHANTHA GUNASEKARA"
          onClick={() => navigate("/view_appointment")}
        >
          Universal Physician
        </Button>
        <Button
          sx={{
            width: '33.33%',
            fontSize: '18px',
            color: 'white',
            backgroundColor: '#9c27b0',
          }}
          key="BUDDHI MOHOTTI"
          onClick={() => navigate("/view_appointment1")}
        >
          Pediatrician
        </Button>
        <Button
          sx={{
            width: '33.33%',
            fontSize: '18px',
            color: 'white',
            backgroundColor: '#9c27b0',
          }}
          key="PRESANTHA BANDARA"
          onClick={() => navigate("/view_appointment2")}
        >
          Radiologist
        </Button>
      </ButtonGroup>
    </Box>

        <Paper
          sx={{
            width: dopen ? "calc(100% - 260px)" : "94%",
            marginLeft: dopen ? "250px" : "80px",
            marginTop: '10px',
            overflow: "hidden",
            padding: "10px",
            transition: "width 0.7s ease",
          }}
        >
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '10px',paddingBottom: '20px', textAlign: 'left',fontSize: '25px' }}>
            UNIVERSAL PHYSICIAN
        </Typography>
      <Grid container alignItems='center'>
        <Grid item xs={1.5} marginRight={6}>
          <FormControl sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="filterSelectLabel">Filter by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              size="small"
              value={filterOption}
              label="Filter option"
              onChange={handleFilterChange}
            >
              <MenuItem value="Appointment Number">Appointment Number</MenuItem>
              <MenuItem value="Appointment Date">Appointment Date</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table  stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey",fontSize: '17px' } }}>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>Appointment Date</TableCell>
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
                        <TableCell>{item.patient_name}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.app_date}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={() => navigate("/update_appointment")}>Update </Button>
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
    </Box>
  );
}

export default ViewAppointment;
