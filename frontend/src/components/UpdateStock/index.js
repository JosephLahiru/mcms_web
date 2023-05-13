import React, { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import ViewStock from "../ViewStock/index.js";

function UpdateStock() {
  const [drugId, setDrugId] = useState("");
  const [autoFillClicked, setAutoFillClicked] = useState(false);
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
        const response = await fetch('https://mcms_api.mtron.me/get_stock_types');
        const data = await response.json();
        setDrugTypes(data);
      } catch (error) {
        console.error(error);
      }
    }

    getDrugTypes();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Unit_price", unitprice);
    console.log("Selling_price",sellingprice);
    console.log("Manufacture Date",ManufactureDate);
    console.log("Expiry Date",ExpiryDate);
    console.log("Quantity",quantity);
    console.log("Brand Name",brandname);

    const data = {
      drug_id: drugId,
      prdct_name: drugname,
      ac_price: unitprice,
      sell_price: sellingprice,
      brand_name: brandname,
      med_type: drugTypes,
      total_quantity: quantity,
      mfd_date: ManufactureDate,
      exp_date: ExpiryDate
    };

    if(!drugId || !drugname || !unitprice || !sellingprice || !quantity || !ManufactureDate || !ExpiryDate || !brandname){
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    if (drugId.length==0 || drugname.length==0) {
      setError(true);
      return;
    }

    fetch('https://mcms_api.mtron.me/update_stock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // handle success response
    console.log('Stock updated successfully', data);
    toast.success('Stock updated successfully', {
      position: toast.POSITION.TOP_RIGHT
    });
  })
  .catch(error => {
    // handle error response
    console.error('Failed to update stock', error);
    toast.error('Failed to update stock', {
      position: toast.POSITION.TOP_RIGHT
    });
  });
  }

  const handleAutoFill = () => {
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
        const formattedManufactureDate = `${manufactureDate.getFullYear()}-${(manufactureDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${manufactureDate.getDate().toString().padStart(2, "0")}`;
      setManufactureDate(formattedManufactureDate);

      // Auto-fill and correct ExpiryDate field
      const expiryDate = new Date(data[0].exp_date);
      const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${expiryDate.getDate().toString().padStart(2, "0")}`;
      setExpiryDate(formattedExpiryDate);

        setAutoFillClicked(true);
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
    <div className="update-stock-main-container">
      <div className="update-stock-form-container">
      <h1 className="h1-stock">Stock Update Form</h1>
      <form className="update-stock-form" onSubmit={handleSubmit}>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Drug ID:</label>
            <input type="text" className="form-control form-control-sm" value={drugId} onChange={(event) => {
                setDrugId(event.target.value);
                if (autoFillClicked) {
                  setDrugName("");
                  setUnitPrice("");
                  setSellingPrice("");
                  setBrandName("");
                  setDrugTypes("");
                  setQuantity("");
                  setManufactureDate("");
                  setExpiryDate("");
                  setAutoFillClicked(false);
                }
              }} placeholder="Drug ID" required/>
              {error&&drugId.length<=0?
            <label className='input-validation-error'>Drug ID can't be Empty</label>:""}
          </div>
          <div className="update-stock-form-input">
              <label className="update-stock-autofill">Auto fill</label>
              <button className="btn btn-primary btn-sm" type="button" onClick={handleAutoFill}>Auto fill</button>
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Drug name</label>
            <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
            {error&&drugname.length<=0?
            <label class='input-validation-error'>Drug Name can't be empty</label>:""}
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Unit price (Rs)</label>
            <input type="number" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
            {error&&unitprice.length<=0?
            <label class='input-validation-error'>Drug unit price can't be empty</label>:""}
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Brand name</label> 
            <input type="text" class="form-control form-control-sm" value={brandname} onChange={(event) => setBrandName(event.target.value)} placeholder="Brand"/>
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Selling price (Rs)</label>
            <input type="number" class="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price"/>
            {error&&sellingprice.length<=0?
            <label class='input-validation-error'>Drug Selling price can't be empty</label>:""}
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Drug type</label>
            <select class="form-control form-control-sm" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="" disabled selected>Select an option . . .</option>
              {drugTypes.map((type) => (
                <option key={type.med_type} value={type.med_type}>{type.med_type}</option>
              ))}
            </select>
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Quantity</label>
            <input type="number" class="form-control form-control-sm" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Quantity"/>
            {error&&quantity.length<=0?
            <label class='input-validation-error'>Drug quantity can't be empty or enter 0</label>:""}
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Manufacture Date</label>
            <input type="date" class="form-control form-control-sm" value={ManufactureDate} onChange={(event) => setManufactureDate(event.target.value)}/>
          </div>
          <div className="update-stock-form-input">
            <label className="update-stock-label">Expiry Date</label>
            <input type="date" class="form-control form-control-sm" value={ExpiryDate} onChange={(event) => setExpiryDate(event.target.value)} required/>
            {error&&ExpiryDate.length<=0?
            <label class='input-validation-error'>Drug Expire date can't be empty</label>:""}
          </div>
          <div className="update-stock-form-button">
            <button class="btn btn-primary btn-sm" onClick={handleReset}>Reset</button>
            <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
        <ToastContainer />
      </div>
      <div className="table-container">
        <ViewStock/>
      </div>
    </div>
  );
}

export default UpdateStock;
