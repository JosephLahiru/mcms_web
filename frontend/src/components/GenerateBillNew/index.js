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
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppstore } from './../../appStore';


function GenerateBillNew() {
  const { dopen } = useAppstore();
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedDrugName, setSelectedDrugName] = useState("");
  const [selectedUnitPrice, setSelectedUnitPrice] = useState("");
  const [selectedExpiry, setSelectedExpiry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addedDrugs, setAddedDrugs] = useState([]);



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

  const handleRowClick = (selectedDrug) => {
    // Extract the product name and unit price from the selected drug object
    const { prdct_name, sell_price, exp_date } = selectedDrug;
    setSelectedDrugName(prdct_name);
    setSelectedUnitPrice(sell_price);
    setSelectedExpiry(exp_date);
  };

const handleAmountCalculation = () => {
    // Parse the quantity and unit price as numbers
    const parsedQuantity = parseFloat(quantity);
    const parsedUnitPrice = parseFloat(selectedUnitPrice);
  
    // Check if both quantity and unit price are valid numbers
    if (!isNaN(parsedQuantity) && !isNaN(parsedUnitPrice)) {
      // Calculate the amount as quantity multiplied by unit price
      const calculatedAmount = (parsedQuantity * parsedUnitPrice).toFixed(2);
      return calculatedAmount;
    }
    // Return an empty string if either quantity or unit price is invalid
    return "";
  };
  
  const handleAddButton = () => {
  // Check if both selectedDrugName and quantity are valid
  if (selectedDrugName && !isNaN(quantity)) {
    // Calculate the amount based on the quantity and unit price
    const calculatedAmount = handleAmountCalculation();

    // Create a new drug object with the details
    const newDrug = {
      product: selectedDrugName,
      expiry: selectedExpiry,
      quantity: parseFloat(quantity),
      unitPrice: parseFloat(selectedUnitPrice),
      discount: "", // Fill in the discount if available
      amount: parseFloat(calculatedAmount),
    };

    // Add the new drug to the list of added drugs
    setAddedDrugs([...addedDrugs, newDrug]);

    // Reset the quantity and selectedDrugName states for the next entry
    setQuantity("");
    setSelectedDrugName("");
    setSelectedUnitPrice("");
  }
};

const handleDeleteRow = (index) => {
  // Create a copy of the addedDrugs array
  const updatedAddedDrugs = [...addedDrugs];

  // Remove the drug at the specified index from the array
  updatedAddedDrugs.splice(index, 1);

  // Update the addedDrugs state with the updated array
  setAddedDrugs(updatedAddedDrugs);
};


const calculateTotalAmount = () => {
  if (addedDrugs.length > 0) {
    // Use the reduce function to calculate the total amount
    const totalAmount = addedDrugs.reduce(
      (accumulator, currentDrug) => accumulator + currentDrug.amount,
      0
    );

    return totalAmount.toFixed(2); // Convert the total to a fixed decimal format (e.g., 2 decimal places)
  }

  return "0.00"; // Return 0.00 if there are no drugs added
};



    return (
        <Grid container spacing={1} sx={{ width: dopen ? "calc(100% - 260px)" : "94%", marginLeft: dopen ? "250px" : "80px", marginTop: '30px', overflow: 'hidden', padding: '10px', transition: "width 0.7s ease" }}>
            <Grid item xs={9}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Paper style={{ padding: "10px" }}>
                    <Grid container spacing={1}>
                    <Grid item xs={6}>
                            <TextField size="small" label="Date" variant="standard" style={{ marginBottom: "5px" }}/>
                            <TextField size="small" label="Invoice no" variant="standard" />
                    </Grid>
                    <Grid item xs={6}>
                            <TextField size="small" label="Patient's Name" variant="standard" style={{ marginBottom: "5px" }}/>
                            <TextField size="small" label="Doctor's Name" variant="standard"/>
                    </Grid>
                    </Grid>
                    </Paper>
                  </Grid>
                    <Grid item xs={12}>
                    <Paper style={{ padding: "10px" }}>
                        <Grid container spacing={1}>     
                        <Grid item xs={2}>
                            <TextField
                                size="small"
                                label="Product Name"
                                value={selectedDrugName}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                size="small"
                                label="Unit Price"
                                value={selectedUnitPrice}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    label="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Discount" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField size="small" label="Discount %" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    label="Amount"
                                    value={handleAmountCalculation()}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid container justifyContent="flex-end" spacing={2} marginTop={1}>
                                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>Print</Button>
                                    <Button variant="contained" color="primary" style={{ marginTop: "10px",marginLeft: "10px" }}>Save</Button>
                                    <Button variant="contained" color="primary" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={handleAddButton}>Add</Button>
                                    <Button variant="contained" color="secondary" style={{ marginTop: "10px", marginLeft: "10px" }}>Clear</Button>
                            </Grid>
                            <Grid item xs={12}>
                            <TableContainer sx={{ maxHeight: 200, minHeight: 200 }} md={{ minWidth: 650 }} sm={{ minWidth: 650 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ "& th": { color:"White", backgroundColor: "grey" }}}>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Expiry</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>U/P</TableCell>
                                        <TableCell>Discount</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {addedDrugs.length > 0 ? (
                                addedDrugs.map((drug, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{drug.product}</TableCell>
                                    <TableCell>{drug.expiry.slice(0, 10)}</TableCell>
                                    <TableCell>{drug.quantity}</TableCell>
                                    <TableCell>{drug.unitPrice}</TableCell>
                                    <TableCell>{drug.discount}</TableCell>
                                    <TableCell>{drug.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                      <IconButton
                                        aria-label="delete"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleDeleteRow(index)}
                                      >
                                      <DeleteIcon />
                                      </IconButton>

                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={6}>No data available</TableCell>
                                </TableRow>
                              )}
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
                                    <TextField
                                      size="small"
                                      label="$Total"
                                      value={calculateTotalAmount()} // Bind the value to the calculated total amount
                                      // Optionally, you can add the following to make the field non-editable
                                      InputProps={{
                                      readOnly: true,
                                    }}
                                    />
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
          <TableContainer sx={{ maxHeight: 500 }}>
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
                    <TableRow hover role="checkbox" key={item.prdct_id} onClick={() => handleRowClick(item)}>  
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