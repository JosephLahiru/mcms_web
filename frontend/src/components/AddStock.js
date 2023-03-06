import React, { useState } from "react";
import './../css/AddStock.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [company, setCompany] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [ExpireDate, setExpireDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Company:", company);
    console.log("Unit Price:", unitprice);
    console.log("Quantity:", quantity);
    console.log("Phone number:", phoneNumber);
    console.log("Manufacture Date:", ManufactureDate);
    console.log("Expire Date:", ExpireDate);

    if(!drugId || !drugname || !company || !unitprice || !quantity || !phoneNumber ) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
  }

  const handleReset = () => {
    setDrugId("");
    setDrugName("");
    setCompany("");
    setUnitPrice("");
    setQuantity("");
    setPhoneNumber("");
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
            Company:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company/Manufacture" required/>
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
            phone Number:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="Phone Number" required/>
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
