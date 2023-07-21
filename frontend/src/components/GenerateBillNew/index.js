import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { 
  Grid,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAppstore } from './../../appStore';


function GenerateBillNew() {
  const { dopen } = useAppstore();
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    async function fetchStock() {
      const response = await fetch("https://mcms_api.mtron.me/get_stock");
      const data = await response.json();

      // Sort the data by product name in ascending order (A to Z)
      const sortedData = data.sort((a, b) =>
        a.prdct_name.localeCompare(b.prdct_name)
      );

      setStock(sortedData);
      setFilteredStock(sortedData);
    }

    fetchStock();
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.length >= 3) {
      const filteredData = stock.filter((item) =>
        item.prdct_name.toLowerCase().includes(searchTerm)
      );
      setFilteredStock(filteredData);
    } else {
      // If the search term is less than 3 characters, reset the filtered data to display all stock data.
      setFilteredStock(stock);
    }
  };

  const handleSort = () => {
    const sortedData = [...filteredStock].sort((a, b) =>
      sortDirection === "asc"
        ? a.prdct_name.localeCompare(b.prdct_name)
        : b.prdct_name.localeCompare(a.prdct_name)
    );
    setFilteredStock(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const rows = filteredStock || [];



    return (
        <Grid container spacing={1} sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '30px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
            <Grid item xs={9}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Paper style={{ padding: "10px" }}>
                            <TextField size="small" label="Date" variant="standard" style={{ marginBottom: "5px" }}/>
                            <TextField size="small" label="Invoice no" variant="standard" />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{ padding: "10px" }}>
                            <TextField size="small" label="Patient's Name" variant="standard" style={{ marginBottom: "5px" }}/>
                            <TextField size="small" label="Doctor's Name" variant="standard"/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper style={{ padding: "10px" }}>
                        <Grid container spacing={1}>
                            
                            <Grid item xs={2}>
                                <TextField size="small" label="Product Name" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Unit Price" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Quantity" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Discount" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Discount %" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Amount" />
                            </Grid>
                            <Grid item xs={12}>
                            <TableContainer sx={{ maxHeight: 200, minHeight: 200 }} md={{ minWidth: 650 }} sm={{ minWidth: 650 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Expiry</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>U/P</TableCell>
                                        <TableCell>Discount</TableCell>
                                        <TableCell>Amount</TableCell>
                                                {/* Add more TableCell components for additional columns */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Empty row to display no data available */}
                                    <TableRow>
                                        <TableCell colSpan={2}>No data available</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table> 
                            </TableContainer>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{ padding: "10px" }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField size="small" label="Discount" style={{ marginBottom: "10px" }} />
                                    <TextField size="small" label="$Total" />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField size="small" label="$Cash" style={{ marginBottom: "10px" }}/>
                                    <TextField size="small" label="BAL" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
            <Paper
      sx={{
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="outlined-size-small"
            size="small"
            fullWidth
            color="secondary"
            value={searchTerm}
            onChange={handleInputChange}
            type="search"
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: "4px" }}>P/ID</TableCell>
                  <TableCell
                    style={{ padding: "4px", cursor: "pointer" }}
                    onClick={handleSort}
                  >
                    Product Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <TableRow hover role="checkbox" key={item.prdct_id}>
                      <TableCell style={{ padding: "4px" }}>
                        {item.prdct_id}
                      </TableCell>
                      <TableCell style={{ padding: "4px" }}>
                        {item.prdct_name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
            </Grid>
        </Grid>
    );
}

export default GenerateBillNew;