import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Grid,
  Paper,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddStock() {
  const [drugname, setDrugName] = useState("");
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [ManufacturedDate, setManufacturedDate] = useState(null);
  const [ExpireDate, setExpireDate] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getDrugTypes() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_stock_types');
        const data = await response.json();
        setDrugTypes(data);
      } catch (error) {
        console.error(error);
      }
    }

    getDrugTypes();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Drug Name:", drugname);
    console.log("Brand Name:", brandname);
    console.log("Description", description);
    console.log("Unit Price:", unitprice);
    console.log("Selling Price:", sellingprice);
    console.log("Quantity:", quantity);
    console.log("Purchased Date:", purchaseDate);
    console.log("Manufacture Date:", ManufacturedDate);
    console.log("Expire Date:", ExpireDate);

    if (drugname.length === 0 || ExpireDate.length === 0 || unitprice.length === 0 || quantity.length === 0) {
      setError(true);
    }

    if ((!drugname && !brandname && !unitprice && !unitprice) || !quantity || !purchaseDate || !ManufacturedDate || !ExpireDate) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

  }

  const handleReset = () => {
    setDrugName("");
    setSelectedType("");
    setBrandName("");
    setDescription("");
    setUnitPrice("");
    setSellingPrice("");
    setQuantity("");
    setPurchaseDate("");
    setManufacturedDate("");
    setExpireDate("");
    setError(false);
  };


  return (
    <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '5% 25%' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={drugname} onChange={(event) => setDrugName(event.target.value)} label="Drug Name"/>
            {error && drugname.length <= 0 ?
              <InputLabel class='input-validation-error'>Drug Name can't be empty</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} label="Unit Price" required />
            {error && unitprice.length <= 0 ?
              <InputLabel class='input-validation-error'>Drug unit price can't be empty</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={brandname} onChange={(event) => setBrandName(event.target.value)} label="Brand Name" required />
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} label="Selling Price" required />
            {error && sellingprice.length <= 0 ?
              <InputLabel class='input-validation-error'>Drug Selling price can't be empty</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={purchaseDate}
                onChange={(date) => setPurchaseDate(date)}
                label="Purchase Date"
                slotProps={{ textField: { size: 'small' } }}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label">Drug Type</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} size="small" value={selectedType} onChange={(event) => setSelectedType(event.target.value)} label="Drug Type" MenuProps={MenuProps}>
                {drugTypes.map((type) => (
                <MenuItem key={type.med_type} value={type.med_type}>{type.med_type}</MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={ManufacturedDate}
                onChange={(date) => setManufacturedDate(date)}
                label="Manufactured Date"
                slotProps={{ textField: { size: 'small' } }}
                required
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={quantity} onChange={(event) => setQuantity(event.target.value)} label="Quantity" required />
            {error && quantity.length <= 0 ?
              <InputLabel class='input-validation-error'>Drug quantity can't be empty or enter 0</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
                sx={{ width: "100%" }}
                value={ExpireDate}
                onChange={(date) => setExpireDate(date)}
                label="Expire Date"
                slotProps={{ textField: { size: 'small' } }}
                required
              />
            </LocalizationProvider>
            {error && ExpireDate.length <= 0 ?
              <InputLabel class='input-validation-error'>Drug Expire date can't be empty</InputLabel> : ""}
          </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-multiline-static" sx={{ width: "100%" }} multiline value={description} onChange={(event) => setDescription(event.target.value)} label="Description"/>
          </Grid>
          <Grid item xs={6}>
            <button class="btn btn-primary btn-sm" onClick={handleReset}>Reset</button>
          </Grid>
          <Grid item xs={6}>
            <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
          </Grid>
        </Grid>
      </FormControl>
      <ToastContainer />
    </Paper>

  );
}

export default AddStock;