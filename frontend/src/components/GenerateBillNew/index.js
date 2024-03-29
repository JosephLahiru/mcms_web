import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
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
import { useAppstore } from "./../../appStore";

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
  const [doctorCharges, setDoctorCharges] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

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
    const quantityValue = parseFloat(quantity);
    const unitPriceValue = parseFloat(selectedUnitPrice);
    const discountValue = parseFloat(discount); // Parse the discount value
    const discountPercentageValue = parseFloat(discountPercentage); // Parse the discount percentage value

    if (!isNaN(quantityValue) && !isNaN(unitPriceValue)) {
      // Calculate the amount before applying the discount
      const amountBeforeDiscount = quantityValue * unitPriceValue;

      // Calculate the discount amount based on the discount percentage
      const discountAmount = isNaN(discountPercentageValue)
        ? isNaN(discountValue)
          ? 0
          : discountValue
        : (amountBeforeDiscount * (discountPercentageValue / 100)).toFixed(2);

      // Calculate the amount after applying the discount
      const amountAfterDiscount = amountBeforeDiscount - discountAmount;

      return amountAfterDiscount.toFixed(2);
    }

    return "0.00"; // Return 0.00 if the quantity or unit price is not a valid number
  };

  const handleAddButton = () => {
    // Check if both selectedDrugName and quantity are valid
    if (selectedDrugName && !isNaN(quantity)) {
      // Calculate the amount based on the quantity and unit price
      const calculatedAmount = handleAmountCalculation();

      // Determine whether to use discount or discountPercentage based on their availability
      const calculatedDiscount =
        !isNaN(parseFloat(discountPercentage)) &&
        discountPercentage >= 0 &&
        discountPercentage <= 100
          ? (selectedUnitPrice * quantity * discountPercentage) / 100
          : !isNaN(parseFloat(discount))
          ? parseFloat(discount)
          : 0;

      // Create a new drug object with the details
      const newDrug = {
        product: selectedDrugName,
        expiry: selectedExpiry,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(selectedUnitPrice),
        discount: calculatedDiscount,
        amount: parseFloat(calculatedAmount),
      };

      // Add the new drug to the list of added drugs
      setAddedDrugs([...addedDrugs, newDrug]);
      setQuantity("");
      setSelectedDrugName("");
      setSelectedUnitPrice("");
      setDiscount("");
      setDiscountPercentage("");
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

  const handleClearButton = () => {
    // Reset all relevant states to their initial values
    setAddedDrugs([]);
    setQuantity("");
    setSelectedDrugName("");
    setSelectedUnitPrice("");
    setSelectedExpiry("");
    setDoctorCharges("");
    setOtherCharges("");
  };

  const calculateTotalAmount = () => {
    if (addedDrugs.length > 0) {
      // Use the reduce function to calculate the total amount
      const totalAmount = addedDrugs.reduce(
        (accumulator, currentDrug) => accumulator + currentDrug.amount,
        0
      );

      // Add the doctor charges and other charges to the total amount if they are valid numbers
      const parsedDoctorCharges = parseFloat(doctorCharges);
      const parsedOtherCharges = parseFloat(otherCharges);

      let total = totalAmount;

      if (!isNaN(parsedDoctorCharges)) {
        total += parsedDoctorCharges;
      }

      if (!isNaN(parsedOtherCharges)) {
        total += parsedOtherCharges;
      }

      return total.toFixed(2);
    }

    // Include the doctor charges and other charges in the total amount if they are valid numbers
    const parsedDoctorCharges = parseFloat(doctorCharges);
    const parsedOtherCharges = parseFloat(otherCharges);

    let total = 0;

    if (!isNaN(parsedDoctorCharges)) {
      total += parsedDoctorCharges;
    }

    if (!isNaN(parsedOtherCharges)) {
      total += parsedOtherCharges;
    }

    return total.toFixed(2);
  };

  const calculateBalance = () => {
    const totalAmount = parseFloat(calculateNetTotalAmount());
    const parsedCashAmount = parseFloat(cashAmount);

    if (!isNaN(parsedCashAmount)) {
      const balance = (parsedCashAmount - totalAmount).toFixed(2);
      return balance >= 0 ? balance : "0.00"; // Ensure the balance is not negative
    }

    return "0.00"; // Return 0.00 if the cash amount is not a valid number
  };

  const handleDiscountChange = (event) => {
    const discountValue = parseFloat(event.target.value);
    setDiscountValue(isNaN(discountValue) ? 0 : discountValue);
  };

  const calculateNetTotalAmount = () => {
    const totalAmount = calculateTotalAmount(); // Assuming you already have the calculateTotalAmount function

    return (totalAmount - discountValue).toFixed(2);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        width: dopen ? "calc(100% - 260px)" : "94%",
        marginLeft: dopen ? "250px" : "80px",
        marginTop: "30px",
        overflow: "hidden",
        padding: "10px",
        transition: "width 0.7s ease",
      }}
    >
      <Grid item xs={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper style={{ padding: "10px" }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    label="Date"
                    variant="standard"
                    style={{ marginBottom: "5px" }}
                  />
                  <TextField
                    size="small"
                    label="Invoice no"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    label="Patient's Name"
                    variant="standard"
                    style={{ marginBottom: "5px" }}
                  />
                  <TextField
                    size="small"
                    label="Doctor's Name"
                    variant="standard"
                  />
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
                  <TextField
                    size="small"
                    label="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    disabled={!isNaN(parseFloat(discountPercentage))}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    label="Discount %"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    disabled={!isNaN(parseFloat(discount))}
                  />
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
                <Grid
                  container
                  justifyContent="flex-end"
                  spacing={2}
                  marginTop={1}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Print
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    onClick={handleAddButton}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    onClick={handleClearButton}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer
                    sx={{ maxHeight: 200, minHeight: 200 }}
                    md={{ minWidth: 650 }}
                    sm={{ minWidth: 650 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            "& th": { color: "White", backgroundColor: "grey" },
                          }}
                        >
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
                              <TableCell style={{ padding: "5px" }}>
                                {drug.product}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
                                {drug.expiry.slice(0, 10)}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
                                {drug.quantity}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
                                {drug.unitPrice}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
                                {drug.discount}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
                                {drug.amount.toFixed(2)}
                              </TableCell>
                              <TableCell style={{ padding: "5px" }}>
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
                  <TextField
                    size="small"
                    label="Dr/charges"
                    style={{ marginBottom: "10px" }}
                    value={doctorCharges}
                    onChange={(e) => setDoctorCharges(e.target.value)}
                  />
                  <TextField
                    size="small"
                    label="Other Charges"
                    style={{ marginBottom: "10px" }}
                    value={otherCharges}
                    onChange={(e) => setOtherCharges(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    label="$Total"
                    value={calculateTotalAmount()}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    size="small"
                    label="Discount"
                    value={discountValue}
                    onChange={handleDiscountChange}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    size="small"
                    label="$Net Total"
                    value={calculateNetTotalAmount()}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ marginBottom: "10px" }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    label="$Cash"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    size="small"
                    label="BAL"
                    value={calculateBalance()}
                    InputProps={{ readOnly: true }}
                  />
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
                        style={{ padding: "5px", cursor: "pointer" }}
                        onClick={handleSort}
                      >
                        Product Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length > 0 ? (
                      rows.map((item) => (
                        <TableRow
                          hover
                          role="checkbox"
                          key={item.prdct_id}
                          onClick={() => handleRowClick(item)}
                        >
                          <TableCell style={{ padding: "5px" }}>
                            {item.prdct_id}
                          </TableCell>
                          <TableCell style={{ padding: "5px" }}>
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
