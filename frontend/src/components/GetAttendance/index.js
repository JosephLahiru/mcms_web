import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function GetAttendance() {
  const [assistantId, setAssistantId] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [date, setDate] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!assistantId || !assistantName || !date || !attendanceStatus) {
      setError(true);
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await fetch('http://158.101.10.103/set_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assist_id: assistantId,
          assist_name: assistantName,
          date: date,
          status: attendanceStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send attendance details');
      }

      toast.success('Attendance details sent successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleReset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to send attendance details', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleReset = () => {
    setAssistantId('');
    setAssistantName('');
    setDate('');
    setAttendanceStatus('');
    setError(false);
  };

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '10% 25%' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Attendance form</h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              value={assistantId}
              onChange={(event) => setAssistantId(event.target.value)}
              label="Assistant ID"
              required
            />
            {error && assistantId.length <= 0 ? (
              <InputLabel className="input-validation-error">
                Assistant ID can't be Empty
              </InputLabel>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              value={assistantName}
              onChange={(event) => setAssistantName(event.target.value)}
              label="Assistant Name"
              required
            />
            {error && assistantName.length <= 0 ? (
              <InputLabel className="input-validation-error">
                Assistant Name can't be empty
              </InputLabel>
            ) : null}
          </Grid>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              size="small"
              sx={{ width: "100%" }}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              label="Date"
              slotProps={{ textField: { size: 'small' } }}
              required
            />
            </LocalizationProvider>
            {error && date.length <= 0 ?
              <InputLabel className="input-validation-error">Date can't be Empty</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Attendance Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "100%" }}
                size="small"
                label="Attendance Status"
                value={attendanceStatus}
                onChange={(event) => setAttendanceStatus(event.target.value)}
                MenuProps={MenuProps}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="late">Late</MenuItem>
              </Select>
            </FormControl>
            {error && attendanceStatus.length <= 0 ? (
              <InputLabel className="input-validation-error">
                Assistant Status can't be Empty
              </InputLabel>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <ToastContainer />
    </Paper>
  );
}

export default GetAttendance;
