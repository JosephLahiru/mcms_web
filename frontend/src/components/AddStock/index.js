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
  Typography,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  const [brandnameError, setBrandNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [unitprice, setUnitPrice] = useState("");
  const [unitpriceError, setUnitPriceError] = useState(false);
  const [sellingprice, setSellingPrice] = useState("");
  const [sellingpriceError, setSellingPriceError] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [stockTypes, setStockTypes] = useState([]);
  const [selectedStockType, setSelectedStockType] = useState("");
  const [PurchasedDate, setPurchasedDate] = useState(null);
  const [ManufacturedDate, setManufacturedDate] = useState(null);
  const [ExpireDate, setExpireDate] = useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A15B9E", // Replace with your desired color
      },
    },
  });

  const handleDrugNameChange = (event) => {
    const value = event.target.value;
    const isValidDrugName = /^[A-Za-z0-9\s]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;
    
    setDrugName(value);
    
    if (!isValidDrugName) {
      setDrugNameError("Please enter a valid drug name");
    } else if (!isWithinLengthLimit) {
      setDrugNameError("Drug name should not exceed 50 characters");
    } else {
      setDrugNameError("");
    }
  };

  const handleBrandNameChange = (event) => {
    const value = event.target.value;
    const isValidBrandName = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

    setBrandName(value);

    if (!isValidBrandName) {
      setBrandNameError("Please enter a valid brand name");
    } else if (!isWithinLengthLimit) {
      setBrandNameError("Brand name should not exceed 50 characters");
    } else {
      setBrandNameError("");
    }
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    const isWithinLengthLimit = value.length <= 255;

    setDescription(value);

    if (!isWithinLengthLimit) {
      setDescriptionError("Description should not exceed 255 characters");
    } else {
      setDescriptionError("");
    }
  };

  const handleUnitPriceChange = (event) => {
    const isValidUnitPrice = /^[0-9]{1,6}(\.[0-9]{1,2})?$/.test(event.target.value);
    setUnitPrice(event.target.value);
    setUnitPriceError(!isValidUnitPrice);
  };

  const handleSellingPriceChange = (event) => {
    const isValidSellingPrice = /^[0-9]{1,6}(\.[0-9]{1,2})?$/.test(event.target.value);
    setSellingPrice(event.target.value);
    setSellingPriceError(!isValidSellingPrice);
  };

  const handleQuantityChange = (event) => {
    const isValidQuantity = /^\d{1,6}$/.test(event.target.value);
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


  function getStockTypeId(stockType) {
    return fetch('https://mcms_api.mtron.me/get_stock_type_id/' + stockType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Stock Type Id');
        }
        return response.json();
      })
      .then((data) => {
        const stockTypeValue = data.length > 0 ? data[0].stock_type_id : '';
        return stockTypeValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  }  


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedPurchasedDate = PurchasedDate ? dayjs(PurchasedDate).format('YYYY-MM-DD') : null;
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
      stock_type: await getStockTypeId(selectedStockType),
      purchased_date: formattedPurchasedDate,
      mfd_date: formattedManufacturedDate,
      exp_date: formattedExpireDate,
    };

    if (!drugname || !brandname || !selectedDrugType || !unitprice || !sellingprice || !quantity || !selectedStockType || !formattedPurchasedDate || !formattedManufacturedDate || !formattedExpireDate) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  
    // Validate dates
    if (formattedPurchasedDate && formattedManufacturedDate && formattedExpireDate) {
      const purchasedDate = dayjs(formattedPurchasedDate);
      const manufacturedDate = dayjs(formattedManufacturedDate);
      const expireDate = dayjs(formattedExpireDate);
  
      if (manufacturedDate.isAfter(expireDate)) {
        toast.error("Manufactured date should be before the expiry date", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
  
      if (purchasedDate.isBefore(manufacturedDate) || purchasedDate.isAfter(expireDate)) {
        toast.error("Purchased date should be between manufactured date and expiry date", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    }

    console.log(data);
    if(!drugnameError && !unitpriceError && !sellingpriceError && !quantityError && !descriptionError && drugname && brandname && selectedDrugType && unitprice && sellingprice && quantity && selectedStockType && formattedPurchasedDate && formattedManufacturedDate && formattedExpireDate){
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
    setPurchasedDate(null);
    setManufacturedDate(null);
    setExpireDate(null);
  };
  

  return (
      <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '5% auto auto', backgroundColor: '#f5f5f5' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ margin:'10px 0px 15px' }} >
            Add Stock
          </Typography>
            <hr style={{ margin: '10px 0' }} />
          </Grid>
          <Grid item xs={6}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            color="secondary"
            value={drugname}
            error={drugnameError}
            helperText={drugnameError}
            onChange={handleDrugNameChange}
            label="Drug Name"
            required
          />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              type="number"
              size="small"
              sx={{ width: "100%" }} 
              color="secondary"
              value={unitprice} 
              error={unitpriceError} 
              helperText={unitpriceError ? 'Please enter a valid purchased price' : ''} 
              onChange={handleUnitPriceChange} 
              label="Purchased Price (Rs)" 
              required
              />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              size="small" 
              sx={{ width: "100%" }} 
              color="secondary"
              value={brandname}
              error={brandnameError}
              helperText={brandnameError}
              onChange={handleBrandNameChange}
              label="Brand Name" 
              required
              />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              type="number" 
              size="small" 
              sx={{ width: "100%" }}
              color="secondary"
              value={sellingprice} 
              error={sellingpriceError} 
              helperText={sellingpriceError ? 'Please enter a valid selling price' : ''} 
              onChange={handleSellingPriceChange} 
              label="Selling Price (Rs)"
              required
              />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label" color="secondary">Drug Type *</InputLabel>
              <Select 
                labelId="demo-simple-select-label" 
                id="demo-simple-select" 
                sx={{ width: "100%" }} 
                color="secondary"
                size="small" 
                value={selectedDrugType} 
                onChange={(event) => setSelectedDrugType(event.target.value)} 
                label="Drug Type" 
                MenuProps={MenuProps}>
                {drugTypes.map((type) => (
                <MenuItem key={type.med_type} value={type.med_type}>{type.med_type}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={PurchasedDate}
                onChange={(date) => setPurchasedDate(date)}
                label="Purchased Date *"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </ThemeProvider>
          </Grid>
          <Grid item xs={6}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={ManufacturedDate}
                onChange={(date) => setManufacturedDate(date)}
                label="Manufactured Date *"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </ThemeProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              type="number" 
              size="small" 
              sx={{ width: "100%" }} 
              color="secondary"
              value={quantity} error={quantityError} 
              helperText={quantityError ? 'Please enter a valid quantity' : ''} 
              onChange={handleQuantityChange} 
              label="Quantity" 
              required
              />
          </Grid>
          <Grid item xs={6}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
                sx={{ width: "100%"}}
                value={ExpireDate}
                onChange={(date) => setExpireDate(date)}
                label="Expiry Date *"
                slotProps={{ textField: { size: 'small' } }}
                inputProps={{ required: true }}
              />
            </LocalizationProvider>
          </ThemeProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label" color="secondary">Stock Type *</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} color="secondary" size="small" value={selectedStockType} onChange={(event) => setSelectedStockType(event.target.value)} label="Stock Type" MenuProps={MenuProps}>
                {stockTypes.map((type) => (
                <MenuItem key={type.stock_type} value={type.stock_type}>{type.stock_type}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="outlined-multiline-static" 
              sx={{ width: "100%" }} 
              color="secondary"
              multiline 
              value={description}
              error={descriptionError}
              helperText={descriptionError}
              onChange={handleDescriptionChange}
              label="Description"/>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2} marginTop={1}>
          <Grid item xs={2}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleReset} sx={{ width: '100%' }}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" size="small" onClick={handleSubmit} sx={{ width: '100%' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <ToastContainer />
    </Paper>
  );
}

export default AddStock;
