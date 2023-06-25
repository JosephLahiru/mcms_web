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
import dayjs from 'dayjs';

function AddStock() {
  const [drugname, setDrugName] = useState("");
  const [drugnameError, setDrugNameError] = useState(false);
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedDrugType, setSelectedDrugType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [unitpriceError, setUnitPriceError] = useState(false);
  const [sellingprice, setSellingPrice] = useState("");
  const [sellingpriceError, setSellingPriceError] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [stockTypes, setStockTypes] = useState([]);
  const [selectedStockType, setSelectedStockType] = useState("");
  const [expireTypes, setExpireTypes] = useState([]);
  const [selectedExpireType, setSelectedExpireType] = useState("");
  const [ManufacturedDate, setManufacturedDate] = useState(null);
  const [ExpireDate, setExpireDate] = useState(null);

  const handleDrugNameChange = (event) => {
    const isValidDrugName = /^[A-Za-z0-9\s]*$/.test(event.target.value);
    setDrugName(event.target.value);
    setDrugNameError(!isValidDrugName);
  };

  const handleUnitPriceChange = (event) => {
    const isValidUnitPrice = /^[0-9]+(\.[0-9]{1,2})?$/.test(event.target.value);
    setUnitPrice(event.target.value);
    setUnitPriceError(!isValidUnitPrice);
  };

  const handleSellingPriceChange = (event) => {
    const isValidSellingPrice = /^[0-9]+(\.[0-9]{1,2})?$/.test(event.target.value);
    setSellingPrice(event.target.value);
    setSellingPriceError(!isValidSellingPrice);
  };

  const handleQuantityChange = (event) => {
    const isValidQuantity = /^[0-9]+$/.test(event.target.value);
    setQuantity(event.target.value);
    setQuantityError(!isValidQuantity);
  };

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

  useEffect(() => {
    async function getDrugTypes() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_med_types');
        const data = await response.json();
        setDrugTypes(data);
      } catch (error) {
        console.error(error);
      }
    }
    getDrugTypes();
  }, []);

  useEffect(() => {
    async function getStockTypes() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_stock_types');
        const data = await response.json();
        setStockTypes(data);
      } catch (error) {
        console.error(error);
      }
    }
    getStockTypes();
  }, []);

  useEffect(() => {
    async function getExpireTypes() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_expire_types');
        const data = await response.json();
        setExpireTypes(data);
      } catch (error) {
        console.error(error);
      }
    }
    getExpireTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('drugname: ' + drugname);
    console.log('brandname: ' + brandname);
    console.log('selectedDrugType: ' + selectedDrugType);
    console.log('descriptiongname: ' + description);
    console.log('unitprice: ' + unitprice);
    console.log('sellingprice: ' + sellingprice);
    console.log('quantity: ' + quantity);
    console.log('stocktype: ' + selectedStockType);
    console.log('expiretype: ' + selectedExpireType);
    console.log('ManufacturedDate: ' + ManufacturedDate);
    console.log('ExpireDate: ' + ExpireDate);

    const formattedManufacturedDate = ManufacturedDate ? dayjs(ManufacturedDate).format('YYYY-MM-DD') : null;
    const formattedExpireDate = ExpireDate ? dayjs(ExpireDate).format('YYYY-MM-DD') : null;

    const data = {
      prdct_name: drugname,
      brand_name: brandname,
      med_type: selectedDrugType,
      description: description,
      ac_price: unitprice,
      sell_price: sellingprice,
      total_quantity: quantity,
      stock_type: selectedStockType,
      expire_type: selectedExpireType,
      mfd_date: formattedManufacturedDate,
      exp_date: formattedExpireDate,
    };

    console.log(data);

    if(!drugnameError && !unitpriceError && !sellingpriceError && !quantityError && drugname && brandname && selectedDrugType && description && unitprice && sellingprice && quantity && selectedStockType && selectedExpireType && formattedManufacturedDate && formattedExpireDate){
      try {
        const response = await fetch("https://mcms_api.mtron.me/set_stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // Data successfully saved to the database
          toast.success("Stock data saved successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleReset();
        } else {
          // Error occurred while saving the data
          toast.error("Failed to save stock data", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while saving the stock data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleReset = () => {
    setDrugName("");
    setSelectedDrugType("");
    setBrandName("");
    setDescription("");
    setUnitPrice("");
    setSellingPrice("");
    setQuantity("");
    setSelectedStockType("");
    setSelectedExpireType("");
    setManufacturedDate("");
    setExpireDate("");
  };

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '5% auto' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={drugname} error={drugnameError} helperText={drugnameError ? 'Pleae enter a valid drug name' : ''} onChange={handleDrugNameChange} label="Drug Name"/>
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={unitprice} error={unitpriceError} helperText={unitpriceError ? 'Please enter a valid unit price' : ''} onChange={handleUnitPriceChange} label="Unit Price" />
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={brandname} onChange={(event) => setBrandName(event.target.value)} label="Brand Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={sellingprice} error={sellingpriceError} helperText={sellingpriceError ? 'Please enter a valid selling price' : ''} onChange={handleSellingPriceChange} label="Selling Price" />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label">Drug Type</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} size="small" value={selectedDrugType} onChange={(event) => setSelectedDrugType(event.target.value)} label="Drug Type" MenuProps={MenuProps}>
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
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={quantity} error={quantityError} helperText={quantityError ? 'Please enter a valid quantity' : ''} onChange={handleQuantityChange} label="Quantity" />
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
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label">Stock Type</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} size="small" value={selectedStockType} onChange={(event) => setSelectedStockType(event.target.value)} label="Stock Type" MenuProps={MenuProps}>
                {stockTypes.map((type) => (
                <MenuItem key={type.stock_type} value={type.stock_type}>{type.stock_type}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label">Expire Type</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} size="small" value={selectedStockType} onChange={(event) => setSelectedExpireType(event.target.value)} label="Expire Type" MenuProps={MenuProps}>
                {expireTypes.map((type) => (
                <MenuItem key={type.expire_type} value={type.expire_type}>{type.expire_type}</MenuItem>
              ))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
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
