import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { useAppstore } from "../../appStore";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "prdct_id", headerName: "Drug ID", flex: 1 },
  { field: "prdct_name", headerName: "Drug Name", flex: 1 },
  { field: "brand_name", headerName: "Brand Name", flex: 1 },
  {
    field: "mfd_date",
    headerName: "Manufactured Date",
    flex: 1,
    valueGetter: (params) => params.row.mfd_date.slice(0, 10),
  },
  {
    field: "exp_date",
    headerName: "Expiry Date",
    flex: 1,
    valueGetter: (params) => params.row.exp_date.slice(0, 10),
  },
  { field: "total_quantity", headerName: "Quantity", flex: 1 },
];

function ViewExpiredStock() {
  const { dopen } = useAppstore();
  const [expiredStock, setExpiredStock] = useState([]);

  useEffect(() => {
    async function fetchExpiredStock() {
      try {
        const response = await fetch("https://mcms_api.mtron.me/get_expired");
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

  return (
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
            View Expired Stock
          </Typography>
          <hr style={{ margin: "10px 0" }} />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 440 }}>
            <DataGrid
              rows={expiredStock.map((item) => ({
                ...item,
                id: item.prdct_id,
              }))}
              columns={columns}
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

export default ViewExpiredStock;
