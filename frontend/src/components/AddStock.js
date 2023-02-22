import React, { useState } from "react";
//import './PersonalDetailsForm.css';

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
  }
/*
  const handleResetClick = () => {
    setFormValues({
      drugname: '',
      company: '',
      unitprice: '',
      quantity: '',
      phoneNumber: ''
    });
  };
*/

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>

        <div className="form-input">
          <input type="text" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        </div>
      <br />
        <div className="form-input">
          <input type="text" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company/Manufacture"/>
        </div>
      <br />
      <div className="form-input">
        <input type="tel" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
      </div>
      <br />
      <div className="form-input">
        <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value) } placeholder="Quantity"/>
      </div>
      <br />
      <div className="form-input">
        <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value) } placeholder="Phone number"/>
      </div>
      <br />
      <button type="reset" classname="form-button" /* onClick={handleResetClick} */>Reset</button>
      <button type="submit" classname="form-button">submit</button>
    </form>
    </div>
  );
}

export default AddStock;
