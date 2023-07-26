import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useAppstore } from './../../appStore';

function GetAttendance() {
  const { dopen } = useAppstore();
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs('2023-07-10'));
  const [assistants, setAssistants] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    fetchAssistants();
    setCurrentDate(dayjs());
  }, []);

  useEffect(() => {
    initializeAttendanceData();
  }, [assistants]);

  const fetchAssistants = async () => {
    try {
      const response = await fetch('https://mcms_api.mtron.me/get_assistants');
      const data = await response.json();
      setAssistants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const initializeAttendanceData = () => {
    const initialData = assistants.map((assistant) => ({
      assistantId: assistant.assit_id,
      attendance: {},
    }));
    setAttendanceData(initialData);
  };

  const handlePreviousWeek = () => {
    setSelectedWeekStart(selectedWeekStart.subtract(7, 'day'));
  };

  const handleNextWeek = () => {
    setSelectedWeekStart(selectedWeekStart.add(7, 'day'));
  };

  const handleSetAttendance = (assistantId, date, updatedAttendance) => {
    const newAttendanceData = attendanceData.map((data) => {
      if (data.assistantId === assistantId) {
        return {
          ...data,
          attendance: {
            ...data.attendance,
            [date]: updatedAttendance,
          },
        };
      }
      return data;
    });
    setAttendanceData(newAttendanceData);
  };
  

  const handleAttendanceSubmit = async (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const currentDate = dayjs().format('YYYY-MM-DD');
    
    if (formattedDate > currentDate) {
      toast.error("Cannot submit attendance for future dates.", {
        position: toast.POSITION.TOP_RIGHT
      });
      console.log('Cannot submit attendance for future dates.');
      return;
    }
  
    for (const data of attendanceData) {
      const attendanceStatus = data.attendance[formattedDate];
      if (attendanceStatus === undefined) {
        console.log(`Attendance not filled for Assistant ID ${data.assistantId} on ${formattedDate}.`);
        continue;
      }
  
      const status = attendanceStatus === 'Present' ? 1 : 0;
      const attendancePayload = {
        assit_id: data.assistantId,
        date: formattedDate,
        status: status,
      };
  
      try {
        const response = await fetch('http://158.101.10.103/set_attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendancePayload),
        });
  
        if (response.ok) {
          toast.success("Attendance set successfully for Assistant ID " + data.assistantId, {
            position: toast.POSITION.TOP_RIGHT
          });
          console.log('Attendance set successfully:', attendancePayload);
        } else {
          toast.error("Failed to set attendance for Assistant ID " + data.assistantId, {
            position: toast.POSITION.TOP_RIGHT
          });
          console.error('Failed to set attendance:', attendancePayload);
        }
      } catch (error) {
        toast.error("An error occurred while setting attendance for Assistant ID " + data.assistantId, {
          position: toast.POSITION.TOP_RIGHT
        });
        console.error('An error occurred while setting attendance:', error);
      }
    }
  };
  
  

  const renderTableHeader = () => {
    const headerCells = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = selectedWeekStart.clone().add(i, 'day');
      const formattedDate = currentDate.format('YYYY-MM-DD');
      headerCells.push(
        <TableCell key={formattedDate} align="center">
          {currentDate.format('MMM DD')}
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleAttendanceSubmit(formattedDate)}
            disabled={!isAttendanceFilled(formattedDate)}
          >
            Submit
          </Button>
        </TableCell>
      );
    }

    return (
      <TableHead>
        <TableRow>
          <TableCell>Assistant ID</TableCell>
          <TableCell>Assistant Name</TableCell>
          {headerCells}
        </TableRow>
      </TableHead>
    );
  };

  const renderAttendanceCells = (assistant) => {
    const attendanceCells = [];
  
    for (let i = 0; i < 7; i++) {
      const currentDate = selectedWeekStart.clone().add(i, 'day');
      const formattedDate = currentDate.format('YYYY-MM-DD');
  
      const attendanceDataForDay = attendanceData.find((data) => data.assistantId === assistant.assit_id)?.attendance[formattedDate] || {};
  
      const isDisabled = !!attendanceDataForDay.check_in && !!attendanceDataForDay.check_out;
  
      attendanceCells.push(
        <TableCell key={formattedDate} align="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Check In"
            value={attendanceDataForDay.check_in || null}
            onChange={(time) => handleSetAttendance(assistant.assit_id, formattedDate, { ...attendanceDataForDay, check_in: time })}
            disabled={attendanceDataForDay.leave === 1}
            slotProps={{ textField: { size: 'small' } }}
          />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Check Out"
            value={attendanceDataForDay.check_out || null}
            onChange={(time) => handleSetAttendance(assistant.assit_id, formattedDate, { ...attendanceDataForDay, check_out: time })}
            disabled={attendanceDataForDay.leave === 1}
            slotProps={{ textField: { size: 'small' } }}
          />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                checked={attendanceDataForDay.leave === 1}
                onChange={(e) => handleSetAttendance(assistant.assit_id, formattedDate, { ...attendanceDataForDay, leave: e.target.checked ? 1 : 0 })}
                disabled={isDisabled}
              />
            }
            label="Leave"
          />
        </TableCell>
      );
    }
  
    return attendanceCells;
  };  
  

  const isAttendanceFilled = (date) => {
    return attendanceData.every((data) => data.attendance[date] !== undefined);
  };

  const startOfWeek = selectedWeekStart.format('D MMMM YYYY');
  const endOfWeek = selectedWeekStart.clone().add(6, 'day').format('D MMMM YYYY');

  return (
    <Paper sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '50px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h4" marginTop={1} >
            Today, {currentDate.format('D MMMM YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={6} marginTop={1} >
          <Typography variant="h4" align="right">
            {startOfWeek} - {endOfWeek}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              {renderTableHeader()}
              <TableBody>
                {assistants.map((assistant) => (
                  <TableRow key={assistant.assit_id}>
                    <TableCell>{assistant.assit_id}</TableCell>
                    <TableCell>{`${assistant.first_name} ${assistant.last_name}`}</TableCell>
                    {renderAttendanceCells(assistant)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end" spacing={1} >
  <Grid item>
    <Button variant="contained" onClick={handlePreviousWeek}>
      Previous Week
    </Button>
  </Grid>
  <Grid item>
    <Button variant="contained" onClick={handleNextWeek}>
      Next Week
    </Button>
  </Grid>
</Grid>         
      </Grid>
      <ToastContainer />
    </Paper>
  );
}

export default GetAttendance;
