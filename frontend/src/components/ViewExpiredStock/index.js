import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@mui/material";
import { useAppstore } from '../../appStore';

function ViewExpiredStock() {
  const { dopen } = useAppstore();
  const [expiredStock, setExpiredStock] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchExpiredStock() {
      try {
        const response = await fetch("https://mcms_api.mtron.me/get_expire");
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setExpiredStock(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchExpiredStock();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = expiredStock || [];

  return (
    <Paper sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '50px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            View Expired Stock
          </Typography>
          <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ "& th": { color: "White", backgroundColor: "grey" } }}>
                  <TableCell>Drug ID</TableCell>
                  <TableCell>Drug Name</TableCell>
                  <TableCell>Brand Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Expired Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow hover role="checkbox" key={item.prdct_id}>
                        <TableCell>{item.prdct_id}</TableCell>
                        <TableCell>{item.prdct_name}</TableCell>
                        <TableCell>{item.brand_name}</TableCell>
                        <TableCell>{item.total_quantity}</TableCell>
                        <TableCell>{item.exp_date.slice(0, 10)}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ViewExpiredStock;
