import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './../css/Style.css';

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
    <div className="form-container">
       <form onSubmit={handleSubmit}>
        <label>Drug ID:</label>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
        </div>
        {error&&drugId.length<=0?
        <label class='input-validation-error'>Drug ID can't be Empty</label>:""}
        <label>Drug name:</label>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        </div>
        {error&&drugname.length<=0?
        <label class='input-validation-error'>Drug Name can't be Empty</label>:""}
        <label>Unit price:</label>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
        </div>
        {error&&unitprice.length<=0?
        <label class='input-validation-error'>Drug unit price can't be Empty</label>:""}
        <label>Selling price:</label>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price"/>
        </div>
        {error&&sellingprice.length<=0?
        <label class='input-validation-error'>Drug Selling price can't be Empty</label>:""}
        <button class="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
      <button class="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
       </form>
       <ToastContainer />
    </div>
  );
}
export default UpdateStock;