import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './../../css/Style.css';
import ViewStock from "../ViewStock/index.js";

function DeleteStock() {
  const [drugId, setDrugId] = useState("");
  const [error, setError] = useState(false);
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Drug ID:", drugId);
  
      if(!drugId){
        toast.error('Please fill all the fields...', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
  
      if (drugId.length === 0) {
        setError(true);
        return;
      }
  
  
      // Reset the form
      setDrugId("");
      setError(false);
  
      toast.success('Drug deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    
  const handleReset = () => {
    setDrugId("");
    setError(false);
  };

    return (
        <div className="main-container1">
          <div className="form-container">
          <form className="form2" onSubmit={handleSubmit}>
            <label className="label1">Drug ID:</label>
            <div className="form-input">
                <input type="text" className="form-control form-control-sm" value={drugId} onChange={(event) => setDrugId(event.target.value)} placeholder="Drug ID"/>
            </div>
            {error && drugId.length <= 0 ?
            <label className='input-validation-error'>Drug ID can't be Empty</label> : ""}
            <div className="form-button">
              <button className="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
              <button className="btn btn-primary btn-sm" type="submit">Delete</button>
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

export default DeleteStock;