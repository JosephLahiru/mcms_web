import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAppstore } from "./../../appStore";

dayjs.extend(localizedFormat);

function ViewAttendance() {
  const { dopen } = useAppstore();
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Assistant ID");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);

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
      case "Status":
        results = attendance.filter((att) =>
          att.status.toString().includes(searchTerm)
        );
        break;
      default:
        results = attendance;
    }
    setFilteredAttendance(results);
  }, [searchTerm, attendance, filterOption]);

  useEffect(() => {
    setSearchTerm(""); // Empty the search term when the filter option changes
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSearchTerm(dayjs(date).format("YYYY-MM-DD"));
  };

  const rows = filteredAttendance || [];

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
                <MenuItem value="Assistant ID">Assistant ID</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="Status">Status</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {filterOption === "Date" ? (
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
            ) : (
              <TextField
                id="outlined-size-small"
                size="small"
                value={searchTerm}
                onChange={handleInputChange}
                label={`Search by ${filterOption}...`}
                type="search"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow
                    sx={{ "& th": { color: "White", backgroundColor: "grey" } }}
                  >
                    <TableCell>Attendance ID</TableCell>
                    <TableCell>Assistant ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ? (
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((att) => (
                        <TableRow hover key={att.att_id}>
                          <TableCell>{att.att_id}</TableCell>
                          <TableCell>{att.assit_id}</TableCell>
                          <TableCell>
                            {dayjs(att.date).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell>{att.status}</TableCell>
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
          </Grid>
          <Grid item xs={12}>
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
      </Paper>
    </LocalizationProvider>
  );
}

export default ViewAttendance;
