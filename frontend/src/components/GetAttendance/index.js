import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function GetAttendance() {
  const [assistantId, setAssistantId] = useState('');
  const [date, setDate] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleSubmit = async (data) => {
    console.log(data);

    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;

    if (assistantId && formattedDate && attendanceStatus) {
    try {
      const response = await fetch('http://158.101.10.103/set_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assist_id: assistantId,
          date: formattedDate,
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
    } else {
      toast.error('Please fill all the fields', {
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
    setDate('');
    setAttendanceStatus('');
  };

  return (
    <Paper sx={{ width: '30%', overflow: 'hidden', padding: '10px', margin: '5% auto' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Assistant ID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "100%" }}
              size="small"
              label="Assistant ID"
              value={assistantId}
              onChange={(event) => setAssistantId(event.target.value)}
              MenuProps={MenuProps}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="1">Assistant 1</MenuItem>
              <MenuItem value="2">Assistant 2</MenuItem>
              <MenuItem value="3">Assistant 3</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
                sx={{ width: "100%" }}
                value={date}
                onChange={(value) => setDate(value)}
                label="Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
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
                <MenuItem value="1">Present</MenuItem>
                <MenuItem value="0">Absent</MenuItem>
                <MenuItem value="2">Late</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button sx={{ width: "100%" }} variant="contained" color="primary" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button sx={{ width: "100%" }} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
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
