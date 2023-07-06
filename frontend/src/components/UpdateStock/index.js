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
  Select,
  MenuItem,
  FormControl,
  
} from "@mui/material";
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
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [stockTypes, setStockTypes] = useState([]);
  const [selectedStockType, setSelectedStockType] = useState("");
  const [expireTypes, setExpireTypes] = useState([]);
  const [selectedExpireType, setSelectedExpireType] = useState("");
  const [ManufacturedDate, setManufactureDate] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");

  const { id } = useParams();

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

  function getExpireTypeId(expireType) {
    return fetch('https://mcms_api.mtron.me/get_expire_type_id/' + expireType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Expire Type Id');
        }
        return response.json();
      })
      .then((data) => {
        const expireTypeValue = data.length > 0 ? data[0].expire_type_id : '';
        return expireTypeValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  }  

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      mfd_date: formattedManufacturedDate,
      exp_date: formattedExpireDate,
      stock_type: await getStockTypeId(selectedStockType),
      expire_type: await getExpireTypeId(selectedExpireType),
    };

    if(!drugnameError && !unitpriceError && !sellingpriceError && !quantityError && drugId && drugname && unitprice && sellingprice && quantity && brandname && selectedType && selectedStockType && selectedExpireType && formattedManufacturedDate && formattedExpireDate){
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

          // Find the expire type based on id and set selectedExpireType
          const selectedExpireTypeId = stock.expire_type;
          setSelectedExpireType(getExpireType(selectedExpireTypeId));

         //const manufactureDateFormatted = dayjs(stock.mfd_date).format('YYYY-MM-DD');
         const manufactureDateFormatted = formatDate(stock.mfd_date);
         const expiryDateFormatted = formatDate(stock.exp_date);

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
        return 'small';
      case 2:
        return 'medium';
      case 3:
        return 'high';
      default:
        return '';
    }
  }

  function getExpireType(selectedExpireTypeId){
    switch (selectedExpireTypeId) {
      case 1:
        return 'short';
      case 2:
        return 'medium';
      case 3:
        return 'long';
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
    setSelectedExpireType("");
    setQuantity("");
    setManufactureDate("");
    setExpiryDate("");
  };

  return (
    <Paper
      sx={{
        width: "50%",
        overflow: "hidden",
        padding: "10px",
        margin: "5% auto",
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              value={drugname}
              error={drugnameError} 
              helperText={drugnameError ? 'Pleae enter a valid drug name' : ''} 
              onChange={handleDrugNameChange}
              label="Drug Name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={brandname}
              onChange={(event) => setBrandName(event.target.value)}
              label="Brand Name"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-simple-select-label">Drug Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "100%" }}
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
            <Select labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: "100%" }} size="small" value={selectedExpireType} onChange={(event) => setSelectedExpireType(event.target.value)} label="Expire Type" MenuProps={MenuProps}>
                {expireTypes.map((type) => (
                <MenuItem key={type.expire_type} value={type.expire_type}>{type.expire_type}</MenuItem>
              ))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={ManufacturedDate}
                onChange={(date) => setManufactureDate(date)}
                label="Manufactured Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
                sx={{ width: "100%" }}
                value={ExpiryDate}
                onChange={(date) => setExpiryDate(date)}
                label="Expire Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              size="small"
              sx={{ width: "100%" }}
              value={unitprice}
              error={unitpriceError}
              helperText={unitpriceError ? 'Please enter a valid unit price' : ''}
              onChange={handleUnitPriceChange}
              label="Unit Price"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              size="small"
              sx={{ width: "100%" }}
              value={sellingprice}
              error={sellingpriceError}
              helperText={sellingpriceError ? 'Please enter a valid selling price' : ''}
              onChange={handleSellingPriceChange}
              label="Selling Price"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              size="small"
              sx={{ width: "100%" }}
              value={quantity}
              error={quantityError}
              helperText={quantityError ? 'Please enter a valid quantity' : ''}
              onChange={handleQuantityChange}
              label="Quantity"
            />
          </Grid>
          <Grid item xs={6}>
            <button class="btn btn-primary btn-sm" onClick={handleReset}>
              Reset
            </button>
          </Grid>
          <Grid item xs={6}>
            <button class="btn btn-primary btn-sm" onClick={handleSubmit}>
              Submit
            </button>
          </Grid>
        </Grid>
      </FormControl>
      <ToastContainer />
    </Paper>
  );
}

export default UpdateStock;
