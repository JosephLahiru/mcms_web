import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { 
  Grid,
  Paper,
  InputLabel,
  TextField,
  Select,
  Typography,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import ViewStockForBill from "../ViewStockForBill";
import { useAppstore } from './../../appStore';


function GenerateBillNew() {
    const { dopen } = useAppstore();


    return (
        <Grid container spacing={1} sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '40px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
            <Grid item xs={9}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Paper style={{ padding: "10px" }}>
                            <TextField size="small" label="Date" />
                            <TextField size="small" label="Invoice no" />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{ padding: "10px" }}>
                            <TextField size="small" label="Patient's Name" />
                            <TextField size="small" label="Doctor's Name" />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <ViewStockForBill />
            </Grid>
        </Grid>
    );
}

export default GenerateBillNew;