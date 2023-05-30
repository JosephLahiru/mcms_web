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

function UpdateStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [brandname, setBrandName] = useState("");
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getDrugTypes() {
      try {
        const response = await fetch(
          "https://mcms_api.mtron.me/get_stock_types"
        );
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

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Unit_price", unitprice);
    console.log("Selling_price", sellingprice);
    console.log("Manufacture Date", ManufactureDate);
    console.log("Expiry Date", ExpiryDate);
    console.log("Quantity", quantity);
    console.log("Brand Name", brandname);

    const data = {
      drug_id: drugId,
      prdct_name: drugname,
      ac_price: unitprice,
      sell_price: sellingprice,
      brand_name: brandname,
      med_type: drugTypes,
      total_quantity: quantity,
      mfd_date: ManufactureDate,
      exp_date: ExpiryDate,
    };

    if (
      !drugId ||
      !drugname ||
      !unitprice ||
      !sellingprice ||
      !quantity ||
      !ManufactureDate ||
      !ExpiryDate ||
      !brandname
    ) {
      toast.error("Please fill all the fields...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (drugId.length == 0 || drugname.length == 0) {
      setError(true);
      return;
    }

    fetch("https://mcms_api.mtron.me/update_stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle success response
        console.log("Stock updated successfully", data);
        toast.success("Stock updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // handle error response
        console.error("Failed to update stock", error);
        toast.error("Failed to update stock", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  const handleUpdate = () => {
    if (!drugId) {
      toast.error("Please enter a drug ID first", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    fetch(`https://mcms_api.mtron.me/get_stock/${drugId}`)
      .then((response) => response.json())
      .then((data) => {
        setDrugName(data[0].prdct_name);
        setBrandName(data[0].brand_name);
        setSelectedType(data[0].med_type);
        setUnitPrice(data[0].ac_price);
        setSellingPrice(data[0].sell_price);
        setQuantity(data[0].total_quantity);

        const manufactureDate = new Date(data[0].mfd_date);
        const formattedManufactureDate = `${manufactureDate.getFullYear()}-${(
          manufactureDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${manufactureDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        setManufactureDate(formattedManufactureDate);

        const expiryDate = new Date(data[0].exp_date);
        const formattedExpiryDate = `${expiryDate.getFullYear()}-${(
          expiryDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${expiryDate.getDate().toString().padStart(2, "0")}`;
        setExpiryDate(formattedExpiryDate);
      })
      .catch((error) => {
        toast.error("Failed to fetch drug details", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleReset = () => {
    setDrugId("");
    setDrugName("");
    setUnitPrice("");
    setSellingPrice("");
    setBrandName("");
    setSelectedType("");
    setQuantity("");
    setManufactureDate("");
    setExpiryDate("");
    setError(false);
  };

  return (
    <Paper
      sx={{
        width: "50%",
        overflow: "hidden",
        padding: "10px",
        margin: "10% auto",
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={drugId}
              onChange={(event) => {
                setDrugId(event.target.value);
              }}
              label="Drug ID"
              required
            />
            {error && drugId.length <= 0 ? (
              <InputLabel className="input-validation-error">
                Drug ID can't be Empty
              </InputLabel>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={drugname}
              onChange={(event) => setDrugName(event.target.value)}
              label="Drug Name"
            />
            {error && drugname.length <= 0 ? (
              <InputLabel class="input-validation-error">
                Drug Name can't be empty
              </InputLabel>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={unitprice}
              onChange={(event) => setUnitPrice(event.target.value)}
              label="Unit Price"
            />
            {error && unitprice.length <= 0 ? (
              <InputLabel class="input-validation-error">
                Drug unit price can't be empty
              </InputLabel>
            ) : (
              ""
            )}
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
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={sellingprice}
              onChange={(event) => setSellingPrice(event.target.value)}
              label="Selling Price"
            />
            {error && sellingprice.length <= 0 ? (
              <InputLabel class="input-validation-error">
                Drug Selling price can't be empty
              </InputLabel>
            ) : (
              ""
            )}
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
                <MenuItem value="" disabled selected>
                  Select an option . . .
                </MenuItem>
                {drugTypes.map((type) => (
                  <MenuItem key={type.med_type} value={type.med_type}>
                    {type.med_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              label="Quantity"
            />
            {error && quantity.length <= 0 ? (
              <InputLabel class="input-validation-error">
                Drug quantity can't be empty or enter 0
              </InputLabel>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={ManufactureDate}
              onChange={(event) => setManufactureDate(event.target.value)}
              label="Manufactured Date"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={ExpiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
              label="Expiry Date"
              required
            />
            {error && ExpiryDate.length <= 0 ? (
              <InputLabel class="input-validation-error">
                Drug Expire date can't be empty
              </InputLabel>
            ) : (
              ""
            )}
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
