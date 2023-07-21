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
  TableCell
} from "@mui/material";
import ViewStockForBill from "../ViewStockForBill";
import { useAppstore } from './../../appStore';


function GenerateBillNew() {
    const { dopen } = useAppstore();


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
                <ViewStockForBill />
            </Grid>
        </Grid>
    );
}

export default GenerateBillNew;