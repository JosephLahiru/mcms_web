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

function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Assistant ID");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
          att.date.toLowerCase().includes(searchTerm)
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

  const rows = filteredAttendance || [];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "10px" }}>
      <Grid container alignItems="center">
        <Grid item xs={1.5}>
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
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey" } }}>
                  <TableCell>Attendance ID</TableCell>
                  <TableCell>Assistant ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.length > 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((att) => (
                  <TableRow key={att.att_id}>
                    <TableCell>{att.att_id}</TableCell>
                    <TableCell>{att.assit_id}</TableCell>
                    <TableCell>{att.date.slice(0, 10)}</TableCell>
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
  );
}

export default ViewAttendance;
