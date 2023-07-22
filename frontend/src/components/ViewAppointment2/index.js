import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
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
  IconButton,
  Modal,

} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppstore } from './../../appStore';

function ViewAppointment2() {
  const { dopen } = useAppstore();
  const [appointment, setAppointment] = useState([]);
  const [filteredAppointment, setFilteredAppointment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [doctorNames, setDoctorNames] = useState([]);


 useEffect(() => {
    fetchDoctorNames();
  }, []);

const handleModalClose = () => {
  setModalOpen(false);
};

const handleModalOpen = (message) => {
  setModalMessage(message);
  setModalOpen(true);
};

const handleConfirmDelete = async () => {
  try {
    await fetch(`https://mcms_api.mtron.me/delete_appointment/${itemToDelete}`, {
      method: "GET",
    });
    setAppointment(appointment.filter((item) => item.app_id !== itemToDelete));
    setFilteredAppointment(
      filteredAppointment.filter((item) => item.app_id !== itemToDelete)
    );
    setItemToDelete(null);
    setConfirmDialogOpen(false);
    handleModalOpen("Appointment deleted successfully");
  } catch (error) {
    handleModalOpen("Failed to delete appointment");
  }
};

const handleCancelDelete = () => {
  setItemToDelete(null);
  setConfirmDialogOpen(false);
};

useEffect(() => {
    async function fetchAppointment() {
      const response = await fetch("https://mcms_api.mtron.me/get_appointment");
      const data = await response.json();
      setAppointment(data);
      setFilteredAppointment(data);
    }
    fetchAppointment();
  }, []);


  const fetchDoctorNames = async () => {
    try {
      const response = await fetch('https://mcms_api.mtron.me/get_doctor_names');
      const data = await response.json();
      const formattedDoctorNames = data.map((doctor) => {
        const fullDoctorType = doctor.d_type.replace('_', ' ').toUpperCase();
        const fullDoctorName = doctor.doctor_name.toUpperCase();
        return {
          cd_id: doctor.cd_id, // Assuming you have the cd_id field in the doctor data
          doctorType: fullDoctorType,
          doctorName: fullDoctorName,
        };
      });
      setDoctorNames(formattedDoctorNames);
    } catch (error) {
      console.error('Error fetching doctor names:', error);
    }
  };

  const getDoctorInfo = (cd_id) => {
    const doctorInfo = doctorNames.find((name) => name.cd_id === cd_id);
    if (doctorInfo) {
      const { doctorType, doctorName } = doctorInfo;
      return { doctorType, doctorName };
    }
    return { doctorType: "", doctorName: "" };
  };

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Appointment Number":
        if (searchTerm.length >= 1) {
          results = appointment.filter((item) => 
            String(item.app_num).includes(searchTerm)
          );
        } else {
          results = appointment;
        }
        break;
      case "Appointment Date":
        if (searchTerm.length >= 3) {
          results = appointment.filter((item) =>
            item.app_date.includes(searchTerm) 
          );
        } else {
          results = appointment;
        }
        break;
      case "Mobile":
        results = appointment.filter((item) =>
          String(item.mobile).includes(searchTerm)
        );
        break;
      default:
        results = appointment;
    }
    setFilteredAppointment(results);
  }, [searchTerm, appointment, filterOption]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setSearchTerm("");
  };

  const handleConfirmAppointment = (item) => {

    console.log("hello  ")

    const {age, app_id, app_date, app_num, cd_id, mobile, nic, gender, patient_name} = item;

    const appointmentDate = app_date.slice(0, 10);
    const appointmentNumber = app_num;
    const patientName = patient_name;

    console.log("hello  2")

     const { doctorName, doctorType } = getDoctorInfo(cd_id);
    navigate(`/confirm_appointment/${app_id}`, {
      state: {
        appointmentDoctor: doctorName, 
        appointmentType: doctorType, 
        appointmentNumber,
        appointmentDate,
        patientName,
        age,
        mobile,
        gender,
        nic,
      },
    });

    console.log("hello  3")
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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

   const handleUpdate = (item) => {
    console.log(item.app_id);
    navigate(`/update_appointment/${item.app_id}`);
  };
 
  return (
    <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
      <Typography 
      variant="h4" 
      component="div" 
      sx={{ 
        color: 'white', 
        fontWeight: 'bold', 
        paddingTop: '40px', 
        textAlign: 'left', 
        paddingLeft: '90px' 
        }}>
        VIEW APPOINTMENT
      </Typography>
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
         Neuro Surgeon
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
          Universal Physician
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
            RADIOLOGIST - PRESANTHA BANDARA
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
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey",fontSize: '17px' } }}>
                  <TableCell>Appointment Id</TableCell>
                  <TableCell>Appointment Number</TableCell>
                  <TableCell>Patient Title</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Payment</TableCell>
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
                         <TableCell>{item.app_id}</TableCell>
                        <TableCell>{item.app_num.toString().padStart(2, "0")}</TableCell>
                        <TableCell>{item.patient_name}</TableCell>
                        <TableCell>{item.age.toString().padStart(2, "0")}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.nic}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.app_date.slice(0,10)}</TableCell>
                        <TableCell>
                            {parseInt(item.payment) === 0 ? (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CancelSharpIcon sx={{ color: 'red', marginRight: '5px' }} />
                                <span style={{  color: 'red', textDecoration: 'underline'}} onClick={() => handleConfirmAppointment(item)}>Not Paid</span>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TaskAltIcon sx={{ color: 'green', marginRight: '5px' }} />
                                <span style={{ color: 'green' }}>Paid</span>
                              </div>
                            )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={() => handleUpdate(item)}>Update</Button>
                        </TableCell>
                        <TableCell>
                         <IconButton
                          aria-label="delete"
                          variant="outlined"
                          size="small"
                          onClick={() => handleDelete(item.app_id)}
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
              <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <div id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} sx={{ color: 'purple' }}>Cancel</Button>
                <Button onClick={handleConfirmDelete} sx={{ color: 'purple' }} autoFocus>Delete</Button>
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
      </Grid>
      <ToastContainer />
    </Paper>
    <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h5" component="h2" color="purple" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {modalMessage === "Appointment deleted successfully" ? "Successful" : "Not Successful"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,textAlign: "center"}} color="black">
            {modalMessage === "Appointment deleted successfully" ? "Appointment deleted successfully!!!" : "Failed to delete appointment!!!"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
            <Button onClick={handleModalClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ViewAppointment2;
