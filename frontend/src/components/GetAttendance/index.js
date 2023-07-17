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
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import dayjs from 'dayjs';

function GetAttendance() {
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs('2023-07-14'));
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

  const handleSetAttendance = (assistantId, date, status) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const newAttendanceData = attendanceData.map((data) => {
      if (data.assistantId === assistantId) {
        return {
          ...data,
          attendance: {
            ...data.attendance,
            [formattedDate]: status,
          },
        };
      }
      return data;
    });
    setAttendanceData(newAttendanceData);
  };

  const handleAttendanceSubmit = async (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    const attendancePayload = attendanceData.map((data) => ({
      assit_id: data.assistantId,
      date: formattedDate,
      status: data.attendance[formattedDate] === 'Present' ? 1 : 0,
    }));

    try {
      const response = await fetch('http://158.101.10.103/set_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendancePayload),
      });

      if (response.ok) {
        console.log('Attendance set successfully:', attendancePayload);
      } else {
        console.error('Failed to set attendance:', attendancePayload);
      }
    } catch (error) {
      console.error('An error occurred while setting attendance:', error);
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

      attendanceCells.push(
        <TableCell key={formattedDate} align="center">
          <RadioGroup
            aria-label={`attendance-${assistant.assit_id}-${formattedDate}`}
            name={`attendance-${assistant.assit_id}-${formattedDate}`}
            value={attendanceData.find((data) => data.assistantId === assistant.assit_id)?.attendance[formattedDate] || ''}
            onChange={(e) =>
              handleSetAttendance(assistant.assit_id, currentDate, e.target.value)
            }
          >
            <FormControlLabel value="Present" control={<Radio />} label="Present" />
            <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
          </RadioGroup>
        </TableCell>
      );
    }

    return attendanceCells;
  };

  const isAttendanceFilled = (date) => {
    return attendanceData.every((data) => data.attendance[date] !== undefined);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', padding: '10px', margin: '5% auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Today, {currentDate.format('D MMMM YYYY')}
          </Typography>
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
        <Grid item xs={12}>
          <Button variant="contained" onClick={handlePreviousWeek}>
            Previous Week
          </Button>
          <Button variant="contained" onClick={handleNextWeek}>
            Next Week
          </Button>
        </Grid>            
      </Grid>
    </Paper>
  );
}

export default GetAttendance;
