import React, { useState } from "react";

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

    if (drugId.length==0 || drugname.length==0) {
      setError(true);
      return;
    }
  }

  return (
    <div className="form-container">
       <form onSubmit={handleSubmit}>
       <div className="form-label">
          <label>Drug ID:</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
        </div>
        {error&&drugId.length<=0?
        <label class='input-validation-error'>Drug ID can't be Empty</label>:""}
         <div className="form-label">
          <label>Drug name:</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={drugname} onChange={(event) => setDrugName(event.target.value)} placeholder="Name of the Drug"/>
        </div>
        {error&&drugname.length<=0?
        <label class='input-validation-error'>Drug Name can't be Empty</label>:""}
        <div className="form-label">
          <label>Unit price:</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={unitprice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Unit Price"/>
        </div>
        {error&&unitprice.length<=0?
        <label class='input-validation-error'>Drug unit price can't be Empty</label>:""}
        <div className="form-label">
          <label>Selling price:</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={sellingprice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="Selling Price"/>
        </div>
        {error&&sellingprice.length<=0?
        <label class='input-validation-error'>Drug Selling price can't be Empty</label>:""}
        <button type="submit">Update stock</button>
       </form>
    </div>
  );
}
export default UpdateStock;