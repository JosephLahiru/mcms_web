import React, { useState ,useEffect } from "react";
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStock() {
  const [drugname, setDrugName] = useState("");
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Drug Name:", drugname);
    console.log("Brand Name:", brandname);
    console.log("Description",description);
    console.log("Unit Price:", unitprice);
    console.log("Selling Price:", sellingprice);
    console.log("Quantity:", quantity);
    console.log("Purchased Date:", purchaseDate);
    console.log("Manufacture Date:", ManufactureDate);
    console.log("Expire Date:", ExpireDate);

    if(drugname.length==0 || ExpireDate.length==0 || unitprice.length==0 || quantity.length==0 ){
      setError(true);
    }

    if(!drugname && !brandname && !unitprice && !unitprice || !quantity || !purchaseDate || !ManufactureDate || !ExpireDate ) {
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
    setManufactureDate("");
    setExpireDate("");
    setError(false);
  };


  return (
      <div className="form-container-add-stock">
        <h1 className="h1-stock">Add Drug into stock</h1>
        <form id="form-add-stock" onSubmit={handleSubmit}>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Drug name</label>
            <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
            {error&&drugname.length<=0?
            <label class='input-validation-error'>Drug Name can't be empty</label>:""}
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Unit price (Rs)</label>
            <input type="number" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price" required/>
            {error&&unitprice.length<=0?
            <label class='input-validation-error'>Drug unit price can't be empty</label>:""}
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Brand name</label> 
            <input type="text" class="form-control form-control-sm" value={brandname} onChange={(event) => setBrandName(event.target.value)} placeholder="Brand" required/>
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Selling price (Rs)</label>
            <input type="number" class="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price" required/>
            {error&&sellingprice.length<=0?
            <label class='input-validation-error'>Drug Selling price can't be empty</label>:""}
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Purchased Date</label>
            <input type="date" class="form-control form-control-sm" value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} required/>
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Drug type</label>
            <select class="form-control form-control-sm" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="" disabled selected>Select an option . . .</option>
              {drugTypes.map((type) => (
                <option key={type.med_type} value={type.med_type}>{type.med_type}</option>
              ))}
            </select>
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Manufacture Date</label>
            <input type="date" class="form-control form-control-sm" value={ManufactureDate} onChange={(event) => setManufactureDate(event.target.value)} required/>
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Quantity</label>
            <input type="number" class="form-control form-control-sm" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Quantity" required/>
            {error&&quantity.length<=0?
            <label class='input-validation-error'>Drug quantity can't be empty or enter 0</label>:""}
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Expiry Date</label>
            <input type="date" class="form-control form-control-sm" value={ExpireDate} onChange={(event) => setExpireDate(event.target.value)} required/>
            {error&&ExpireDate.length<=0?
            <label class='input-validation-error'>Drug Expire date can't be empty</label>:""}
          </div>
          <div className="form-input-add-stock">
            <label className="label-add-stock">Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add description here..."></textarea>
          </div>
          <div className="form-button-add-stock">
            <button class="btn btn-primary btn-sm" onClick={handleReset}>Reset</button>
            <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    
  );
}

export default AddStock;
