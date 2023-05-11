import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './main.css';
import ViewStock from "../ViewStock/index.js";

function UpdateStock() {
  const [drugId, setDrugId] = useState("");
  const [autoFillClicked, setAutoFillClicked] = useState(false);
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
        setUnitPrice(data[0].ac_price);
        setSellingPrice(data[0].sell_price);
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
    setError(false);
  };

  return (
    <div className="update-stock-main-container">
      <div className="update-stock-form-container">
        <h1>Stock Update Form</h1>
        <form className="update-stock-form" onSubmit={handleSubmit}>
          <label className="update-stock-label">Drug ID:</label>
          <div className="update-stock-form-input-id">
            <input type="text" className="form-control form-control-sm" value={drugId} onChange={(event) => {
                setDrugId(event.target.value);
                if (autoFillClicked) {
                  setDrugName("");
                  setUnitPrice("");
                  setSellingPrice("");
                  setAutoFillClicked(false);
                }
              }} placeholder="Drug ID"/>
          <button className="btn btn-primary btn-sm" type="button" onClick={handleAutoFill}>Auto fill</button>
          </div>
          {error&&drugId.length<=0?
          <label className='input-validation-error'>Drug ID can't be Empty</label>:""}
          <label className="update-stock-label">Drug name:</label>
          <div className="update-stock-form-input">
            <input type="text" className="form-control form-control-sm" value={drugname} placeholder="Name of the Drug"/>
          </div>
          {error&&drugname.length<=0?
          <label className='input-validation-error'>Drug Name can't be Empty</label>:""}
          <label className="update-stock-label">Unit price:</label>
          <div className="update-stock-form-input">
            <input type="number" className="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
          </div>
          {error&&unitprice.length<=0?
          <label className='input-validation-error'>Drug unit price can't be Empty</label>:""}
          <label className="update-stock-label">Selling price:</label>
          <div className="update-stock-form-input">
            <input type="number" className="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price"/>
          </div>
          {error&&sellingprice.length<=0?
          <label className='input-validation-error'>Drug Selling price can't be Empty</label>:""}
          <div className="update-stock-form-button">
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
