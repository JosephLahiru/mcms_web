import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import { useAppstore } from './../../appStore';
import { DataGrid } from "@mui/x-data-grid";

const colomns = [
  { field: 'prdct_id', headerName: 'Drug ID', flex: 1 },
  { field: 'prdct_name', headerName: 'Drug Name', flex: 1 },
  { field: 'brand_name', headerName: 'Brand Name', flex: 1 },
  { field: 'mfd_date', headerName: 'Manufactured Date', flex: 1, valueGetter: (params) => params.row.mfd_date.slice(0, 10), },
  { field: 'exp_date', headerName: 'Expiry Date', flex: 1, valueGetter: (params) => params.row.exp_date.slice(0, 10), },
  { field: 'total_quantity', headerName: 'Quantity', flex: 1 },
];

function ViewShortExpiry() {
  const { dopen } = useAppstore();
  const [shortexpiry, setShortExpiry] = useState([]);
  const [filteredShortExpiry, setFilteredShortExpiry] = useState([]);
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    async function fetchShortExpiry() {
      const response = await fetch("https://mcms_api.mtron.me/get_expire_soon");
      const data = await response.json();
      setShortExpiry(data);
      setFilteredShortExpiry(data);
    }
    fetchShortExpiry();
  }, []);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    if (event.target.value === "") {
      setFilteredShortExpiry(shortexpiry);
    } else {
      const filteredData = shortexpiry.filter((item) => item.expire_type === Number(event.target.value));
      setFilteredShortExpiry(filteredData);
    }
  };


  return (
    <Paper sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '50px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
      <Grid container alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom >
            View Short Expiry
          </Typography>
            <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label" color="secondary">Filter option</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              color="secondary"
              value={filterOption}
              label="Filter option"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All short expiry</MenuItem>
              <MenuItem value={1}>short lifespan</MenuItem>
              <MenuItem value={2}>medium lifespan</MenuItem>
              <MenuItem value={3}>long lifespan</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 440 }}>
            <DataGrid
            rows={filteredShortExpiry.map((item) => ({
              ...item,
              id: item.prdct_id,
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
  );
}

export default ViewShortExpiry;
