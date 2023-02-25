import React, { useState } from "react";
import './../css/AddStock.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStock() {
  const [drugname, setDrugName] = useState("");
  const [company, setCompany] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Drug Name:", drugname);
    console.log("Company:", company);
    console.log("Unit Price:", unitprice);
    console.log("Quantity:", quantity);
    console.log("Phone number:", phoneNumber);
    if(!drugname || !company || !unitprice || !quantity || !phoneNumber ) {
      //setShowAlert(true);
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
  }

  const handleReset = () => {
    setDrugName("");
    setCompany("");
    setUnitPrice("");
    setQuantity("");
    setPhoneNumber("");
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
        <div className="form-label">
          <label>
            Drug name:
          </label>
          </div>
        <div className="form-input">
          <input class="form-control form-control-sm" type="text" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        </div>
        <div className="form-label">
          <label>
            Company:
          </label>
          </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company/Manufacture"/>
        </div>
        <div className="form-label">
          <label>
            Unit price:
          </label>
      </div>
      <div className="form-input">
        <input type="tel" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
      </div>
      <div className="form-label">
          <label>
            Quantity:
          </label>
      </div>
      <div className="form-input">
        <input type="text" class="form-control form-control-sm" value={quantity} onChange={(event) => setQuantity(event.target.value) } placeholder="Quantity"/>
      </div>
      <div className="form-label">
          <label>
            phone Number:
          </label>
      </div>
      <div className="form-input">
        <input type="text" class="form-control form-control-sm" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value) } placeholder="Phone number"/>
      </div>
      <button class="btn btn-primary" type="button" onClick={handleReset}>handleReset</button>
      <button class="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
    </form>
    <ToastContainer />
    </div>
  );
}

export default AddStock;
