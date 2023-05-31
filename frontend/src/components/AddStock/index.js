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
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stocktype, setStockType] = useState("");
  const [expiretype, setExpireType] = useState("");
  const [ManufacturedDate, setManufacturedDate] = useState(null);
  const [ExpireDate, setExpireDate] = useState(null);

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
        const response = await fetch('https://mcms_api.mtron.me/get_stock_types');
        const data = await response.json();
        setDrugTypes(data);
      } catch (error) {
        console.error(error);
      }
    }
    getDrugTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('drugname: ' + drugname);
    console.log('brandname: ' + brandname);
    console.log('selectedType: ' + selectedType);
    console.log('drudescriptiongname: ' + description);
    console.log('unitprice: ' + unitprice);
    console.log('sellingprice: ' + sellingprice);
    console.log('quantity: ' + quantity);
    console.log('stocktype: ' + stocktype);
    console.log('expiretype: ' + expiretype);
    console.log('ManufacturedDate: ' + ManufacturedDate);
    console.log('ExpireDate: ' + ExpireDate);

    const formattedManufacturedDate = ManufacturedDate ? dayjs(ManufacturedDate).format('YYYY-MM-DD') : null;
    const formattedExpireDate = ExpireDate ? dayjs(ExpireDate).format('YYYY-MM-DD') : null;

    const data = {
      prdct_name: drugname,
      brand_name: brandname,
      med_type: selectedType,
      description: description,
      ac_price: unitprice,
      sell_price: sellingprice,
      total_quantity: quantity,
      stock_type: stocktype,
      expire_type: expiretype,
      mfd_date: formattedManufacturedDate,
      exp_date: formattedExpireDate,
    };

    console.log(data);

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
  };

  const handleReset = () => {
    setDrugName("");
    setSelectedType("");
    setBrandName("");
    setDescription("");
    setUnitPrice("");
    setSellingPrice("");
    setQuantity("");
    setStockType("");
    setExpireType("");
    setManufacturedDate("");
    setExpireDate("");
  };

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '5% auto' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={drugname} onChange={(event) => setDrugName(event.target.value)} label="Drug Name"/>
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} label="Unit Price" />
          </Grid>
          <Grid item xs={6}>
            <TextField size="small" sx={{ width: "100%" }} value={brandname} onChange={(event) => setBrandName(event.target.value)} label="Brand Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} label="Selling Price" />
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
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={quantity} onChange={(event) => setQuantity(event.target.value)} label="Quantity" />
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
            <TextField type="number" size="small" sx={{ width: "100%" }} value={stocktype} onChange={(event) => setStockType(event.target.value)} label="Stock Type" />
          </Grid>
          <Grid item xs={6}>
            <TextField type="number" size="small" sx={{ width: "100%" }} value={expiretype} onChange={(event) => setExpireType(event.target.value)} label="Expire Type" />
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
