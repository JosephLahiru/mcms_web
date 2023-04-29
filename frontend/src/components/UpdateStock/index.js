import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './main.css';
import ViewStock from "../ViewStock/index.js";

function UpdateStock() {
  const [drugId, setDrugId] = useState("");
  const [drugname, setDrugName] = useState("");
  const [unitprice, setUnitPrice] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Drug ID:", drugId);
    console.log("Drug Name:", drugname);
    console.log("Unit_price", unitprice);
    console.log("Selling_price",sellingprice);

    if(!drugId && !drugname ){
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    if (drugId.length==0 || drugname.length==0) {
      setError(true);
      return;
    }
  }

  const handleReset = () => {
    setDrugId("");
    setDrugName("");
    setUnitPrice("");
    setSellingPrice("");
    setError(false);
  };

  return (
    <div className="main-container1">
      <div className="form-container">
        <h1>Stock Update Form</h1>
        <form className="form2" onSubmit={handleSubmit}>
          <label className="label1">Drug ID:</label>
          <div className="form-input">
            <input type="text" className="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
          </div>
          {error&&drugId.length<=0?
          <label className='input-validation-error'>Drug ID can't be Empty</label>:""}
          <label className="label1">Drug name:</label>
          <div className="form-input">
            <input type="text" className="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
          </div>
          {error&&drugname.length<=0?
          <label className='input-validation-error'>Drug Name can't be Empty</label>:""}
          <label className="label1">Unit price:</label>
          <div className="form-input">
            <input type="text" className="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
          </div>
          {error&&unitprice.length<=0?
          <label className='input-validation-error'>Drug unit price can't be Empty</label>:""}
          <label className="label1">Selling price:</label>
          <div className="form-input">
            <input type="text" className="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price"/>
          </div>
          {error&&sellingprice.length<=0?
          <label className='input-validation-error'>Drug Selling price can't be Empty</label>:""}
          <div className="form-button">
            <button className="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
            <button className="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
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
