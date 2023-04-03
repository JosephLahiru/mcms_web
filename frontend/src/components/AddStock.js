import React, { useState } from "react";
import './../css/Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewStock from "./ViewStock.js";

function AddStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [drugType, setDrugType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Drug Type:", drugType);
    console.log("Brand Name:", brandname);
    console.log("Description",description);
    console.log("Unit Price:", unitprice);
    console.log("Selling Price:", sellingprice);
    console.log("Quantity:", quantity);
    console.log("Purchased Date:", purchaseDate);
    console.log("Manufacture Date:", ManufactureDate);
    console.log("Expire Date:", ExpireDate);

    if(drugId.length==0 || drugname.length==0 || ExpireDate.length==0 || unitprice.length==0 || quantity.length==0 ){
      setError(true);
    }

    if(!drugId && !drugname && !brandname && !unitprice && !unitprice || !quantity || !purchaseDate || !ManufactureDate || !ExpireDate ) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

  }

  const handleReset = () => {
    setDrugId("");
    setDrugName("");
    setDrugType("");
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
    <div className="main-container1">
      <div className="form-container">
        <h1>Add Stock</h1>
        <form id="form1" onSubmit={handleSubmit}>
        <div className="form-input1">
          <label className="label1">Drug ID:</label>
          <input type="text" class="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
        {error&&drugId.length<=0?
        <label class='input-validation-error'>Drug ID can't be empty</label>:""}
        </div>
         <div className="form-input1">
          <label className="label1">Purchased Date</label>
          <input type="date" class="form-control form-control-sm" value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} required/>
        </div>
        <div className="form-input1">
          <label className="label1">Drug name:</label>
          <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        {error&&drugname.length<=0?
        <label class='input-validation-error'>Drug Name can't be empty</label>:""}
        </div>
        <div className="form-input1">
          <label className="label1">Manufacture Date</label>
          <input type="date" class="form-control form-control-sm" value={ManufactureDate} onChange={(event) => setManufactureDate(event.target.value)} required/>
        </div>
        <div className="form-input1">
          <label className="label1">Brand name:</label> 
          <input type="text" class="form-control form-control-sm" value={brandname} onChange={(event) => setBrandName(event.target.value)} placeholder="Brand" required/>
        </div>
        <div className="form-input1">
          <label className="label1">Expire Date</label>
          <input type="date" class="form-control form-control-sm" value={ExpireDate} onChange={(event) => setExpireDate(event.target.value)} required/>
        {error&&ExpireDate.length<=0?
        <label class='input-validation-error'>Drug Expire date can't be empty</label>:""}
        </div>
        <div className="form-input1">
          <label className="label1">Drug type</label>
          <select class="form-control form-control-sm" value={drugType} onChange={setDrugType}>
            <option value="" disabled selected>Select an option</option>
            <option value="Capsules">Capsules</option>
            <option value="Tablet">Tablet</option>
            <option value="Liquid">Liquid</option>
            <option value="Inhalers">Inhalers</option>
            <option value="Injections">Injections</option>
          </select>
        </div>
        <div className="form-input1">
          <label className="label1">Unit price:</label>
          <input type="text" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price" required/>
        {error&&unitprice.length<=0?
        <label class='input-validation-error'>Drug unit price can't be empty</label>:""}
        </div>
        <div className="form-input1">
          <label className="label1">Quantity:</label>
          <input type="number" class="form-control form-control-sm" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Quantity" required/>
        {error&&quantity.length<=0?
        <label class='input-validation-error'>Drug quantity can't be empty or enter 0</label>:""}
        </div>
        <div className="form-input1">
          <label className="label1">Selling price:</label>
          <input type="text" class="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price" required/>
        {error&&sellingprice.length<=0?
        <label class='input-validation-error'>Drug Selling price can't be empty</label>:""}
        </div>
        <div className="form-input1">
          <label className="label1">Description</label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add description here..."></textarea>
        </div>
      <button class="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
      <button class="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
      </form>
    <ToastContainer />
    </div>
    <div className="table-container">
      <ViewStock/>
    </div>
    </div>
    
  );
}

export default AddStock;
