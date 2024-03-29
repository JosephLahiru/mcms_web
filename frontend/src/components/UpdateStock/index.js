import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Grid,
  Paper,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function UpdateStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [drugnameError, setDrugNameError] = useState(false);
  const [unitprice, setUnitPrice] = useState("");
  const [unitpriceError, setUnitPriceError] = useState(false);
  const [sellingprice, setSellingPrice] = useState("");
  const [sellingpriceError, setSellingPriceError] = useState(false);
  const [brandname, setBrandName] = useState("");
  const [brandnameError, setBrandNameError] = useState(false);
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [stockTypes, setStockTypes] = useState([]);
  const [selectedStockType, setSelectedStockType] = useState("");
  const [PurchasedDate, setPurchasedDate] = useState(null);
  const [ManufacturedDate, setManufactureDate] = useState(null);
  const [ExpiryDate, setExpiryDate] = useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A15B9E", // Replace with your desired color
      },
    },
  });

  const { id } = useParams();

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

  useEffect(() => {
    async function getDrugTypes() {
      try {
        const response = await fetch(
          "https://mcms_api.mtron.me/get_med_types"
        );
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
    const formattedExpireDate = ExpiryDate ? dayjs(ExpiryDate).format('YYYY-MM-DD') : null;

    const data = {
      prdct_id: drugId,
      prdct_name: drugname,
      ac_price: unitprice,
      sell_price: sellingprice,
      brand_name: brandname,
      med_type: selectedType,
      total_quantity: quantity,
      purchased_date: formattedPurchasedDate,
      mfd_date: formattedManufacturedDate,
      exp_date: formattedExpireDate,
      stock_type: await getStockTypeId(selectedStockType),
    };

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


    if(!drugnameError && !unitpriceError && !sellingpriceError && !quantityError && drugId && drugname && unitprice && sellingprice && quantity && brandname && selectedType && selectedStockType && formattedPurchasedDate && formattedManufacturedDate && formattedExpireDate){
    try{
      const response = await fetch(`https://mcms_api.mtron.me/update_stock/${data.prdct_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if(response.ok){
        toast.success("Stock updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleReset();
      }else{
        toast.error("Failed to update stock", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }catch(error){
      console.error(error);
      toast.error("An error occured while updating stock", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } else {
    toast.error("Please fill all the fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  };

  useEffect(() => {
    async function getStock() {
      try {
        const response = await fetch(`https://mcms_api.mtron.me/get_stock/${id}`);
        const data = await response.json();

        if (data.length > 0) {
          const stock = data[0];
          setDrugId(stock.prdct_id);
          setDrugName(stock.prdct_name);
          setUnitPrice(stock.ac_price);
          setSellingPrice(stock.sell_price);
          setBrandName(stock.brand_name);
          setQuantity(stock.total_quantity);
          setSelectedType(stock.med_type);

          // Find the stock type based on id and set selectedStockType
          const selectedStockTypeId = stock.stock_type;
          setSelectedStockType(getDrugType(selectedStockTypeId));

         //const DateFormatted = dayjs(stock.mfd_date).format('YYYY-MM-DD');
         const purchasedDateFormatted = formatDate(stock.purchased_date);
         const manufactureDateFormatted = formatDate(stock.mfd_date);
         const expiryDateFormatted = formatDate(stock.exp_date);

         setPurchasedDate(purchasedDateFormatted);
         setManufactureDate(manufactureDateFormatted);
         setExpiryDate(expiryDateFormatted);

        } else {
          toast.error("Drug not found", { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch drug details", { position: toast.POSITION.TOP_RIGHT });
      }
    }

    getStock();
  }, [id]);


  function getDrugType(selectedStockTypeId) {
    switch (selectedStockTypeId) {
      case 1:
        return 'between 1 - 20';
      case 2:
        return 'between 21 - 80';
      case 3:
        return 'more than 80';
      default:
        return '';
    }
  }

  const formatDate = (dateString) => {
    return dayjs(dateString);
  };


  const handleReset = () => {
    setDrugId("");
    setDrugName("");
    setUnitPrice("");
    setSellingPrice("");
    setBrandName("");
    setSelectedType("");
    setSelectedStockType("");
    setQuantity("");
    setPurchasedDate(null);
    setManufactureDate(null);
    setExpiryDate(null);
  };

  return (
    <Paper
      sx={{
        width: "50%",
        overflow: "hidden",
        padding: "10px",
        margin: "5% auto",
        backgroundColor: '#f5f5f5'
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ margin:'10px 0px 15px' }} >
            Update Stock
          </Typography>
            <hr style={{ margin: '10px 0' }} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={drugId}
              onChange={(event) => {setDrugId(event.target.value);}}
              label="Drug ID"
              required
              disabled
            />
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
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label" color="secondary">Drug Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "100%" }}
                color="secondary"
                size="small"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                label="Drug Type"
                MenuProps={MenuProps}
              >
                {drugTypes.map((type) => (
                  <MenuItem key={type.med_type} value={type.med_type}>
                    {type.med_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label" color="secondary">Stock Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "100%" }}
                color="secondary"
                size="small"
                value={selectedStockType}
                onChange={(event) => setSelectedStockType(event.target.value)}
                label="Stock Type"
                MenuProps={MenuProps}>
                {stockTypes.map((type) => (
                <MenuItem key={type.stock_type} value={type.stock_type}>{type.stock_type}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={ManufacturedDate}
                onChange={(date) => setManufactureDate(date)}
                label="Manufactured Date *"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
            </ThemeProvider>
          </Grid>
          <Grid item xs={6}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
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
                size="small"
                sx={{ width: "100%" }}
                value={ExpiryDate}
                onChange={(date) => setExpiryDate(date)}
                label="Expiry Date *"
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
              value={unitprice}
              error={unitpriceError}
              helperText={unitpriceError ? 'Please enter a valid Purchased price' : ''}
              onChange={handleUnitPriceChange}
              label="Purchased Price (Rs)"
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
          <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={6}>
            <TextField
              type="number"
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={quantity}
              error={quantityError}
              helperText={quantityError ? 'Please enter a valid quantity' : ''}
              onChange={handleQuantityChange}
              label="Quantity"
              required
            />
            </Grid>
          </Grid>
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

export default UpdateStock;
