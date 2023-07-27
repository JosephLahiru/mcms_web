import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAppstore } from "./../../appStore";
import { DataGrid } from "@mui/x-data-grid";

const colomns = [
  { field: 'assit_id', headerName: 'Assistant ID', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'check_in', headerName: 'Check In', flex: 1 },
  { field: 'check_out', headerName: 'Check Out', flex: 1 },
  { field: 'leave', headerName: 'leave', flex: 1 },
];

dayjs.extend(localizedFormat);

function ViewAttendance() {
  const { dopen } = useAppstore();
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Assistant ID");
  const [selectedDate, setSelectedDate] = useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A15B9E", // Replace with your desired color
      },
    },
  });

  useEffect(() => {
    async function fetchAttendance() {
      const response = await fetch("https://mcms_api.mtron.me/get_attendance");
      const data = await response.json();
      setAttendance(data);
      setFilteredAttendance(data);
    }
    fetchAttendance();
  }, []);

  useEffect(() => {
    let results;
    switch (filterOption) {
      case "Assistant ID":
        results = attendance.filter((att) =>
          att.assit_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "Date":
        results = attendance.filter((att) =>
          dayjs(att.date).format("YYYY-MM-DD").toLowerCase().includes(searchTerm)
        );
        break;
      default:
        results = attendance;
    }
    if (filterOption === "Date" && selectedDate) {
      results = results.filter((att) =>
        dayjs(att.date).isSame(selectedDate, "day")
      );
    }
  
    setFilteredAttendance(results);
  }, [searchTerm, attendance, filterOption, selectedDate]);

  useEffect(() => {
    setSearchTerm(""); // Empty the search term when the filter option changes
    setSelectedDate(null); // Empty the selected date when the filter option changes
  }, [filterOption]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSearchTerm(dayjs(date).format("YYYY-MM-DD"));
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        sx={{
          width: dopen ? "calc(100% - 260px)" : "94%",
          marginLeft: dopen ? "250px" : "80px",
          marginTop: "50px",
          overflow: "hidden",
          padding: "10px",
          transition: "width 0.7s ease",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              View Attendance
            </Typography>
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
                <MenuItem value="Assistant ID">Assistant ID</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            {filterOption === "Date" ? (
              <ThemeProvider theme={theme}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} size="small" />
                )}
                label={`Search by ${filterOption}...`}
                inputFormat="LL"
                slotProps={{ textField: { size: 'small' } }}
              />
              </ThemeProvider>
            ) : (
              <TextField
                id="outlined-size-small"
                size="small"
                color="secondary"
                value={searchTerm}
                onChange={handleInputChange}
                label={`Search by ${filterOption}...`}
                type="search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
          <div style={{ height: 440 }}>
            <DataGrid
              rows={filteredAttendance.map((item) => ({
                ...item,
                id: item.att_id,
              }))}
              columns={colomns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 100]}
              pagination
            />
          </div>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
}

export default ViewAttendance;
