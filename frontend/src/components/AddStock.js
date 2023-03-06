import React, { useState } from "react";
import './../css/AddStock.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [drugType, setDrugType] = useState("");
  const [brandname, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchase, setPurchaseDate] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Drug Type:", drugType);
    console.log("Brand Name:", brandname);
    console.log("Description",description);
    console.log("Unit Price:", unitprice);
    console.log("Quantity:", quantity);
    console.log("Purchased Date:", purchase);
    console.log("Manufacture Date:", ManufactureDate);
    console.log("Expire Date:", ExpireDate);

    if(!drugId || !drugname || !brandname || !unitprice || !quantity || !purchase || !ManufactureDate || !ExpireDate ) {
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
    setQuantity("");
    setPurchaseDate("");
    setManufactureDate("");
    setExpireDate("");
  };


  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
        <div className="form-label">
          <label>
            Drug ID:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
        </div>
        <div className="form-label">
          <label>
            Drug name:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        </div>
        <div className="form-label">
          <label>
            Drug type
          </label>
        </div>
        <div className="form-input">
          <select class="form-control form-control-sm" value={drugType} onChange={setDrugType}>
            <option value="Capsules">Capsules</option>
            <option value="Tablet">Tablet</option>
            <option value="Liquid">Liquid</option>
            <option value="Inhalers">Inhalers</option>
            <option value="Injections">Injections</option>
          </select>
        </div>
        <div className="form-label">
          <label>
            Brand name:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={brandname} onChange={(event) => setBrandName(event.target.value)} placeholder="Brand" required/>
        </div>
        <div className="form-label">
          <label>
            Description
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={description} onChange={(event) => setDescription(event.target.value)} required/>
        </div>
        <div className="form-label">
          <label>
            Unit price:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price" required/>
        </div>
        <div className="form-label">
          <label>
            Quantity:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Quantity" required/>
        </div>
        <div className="form-label">
          <label>
            Purchased Date
          </label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={purchase} onChange={(event) => setPurchaseDate(event.target.value)} required/>
        </div>
        <div className="form-label">
          <label>
            Manufacture Date
          </label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={ManufactureDate} onChange={(event) => setManufactureDate(event.target.value)} required/>
        </div>
        <div className="form-label">
          <label>
            Expire Date
          </label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={ExpireDate} onChange={(event) => setExpireDate(event.target.value)} required/>
        </div>
      <button class="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
      <button class="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
      <br></br>
      <br></br>
    </form>
    <ToastContainer />
    </div>
  );
}

export default AddStock;
