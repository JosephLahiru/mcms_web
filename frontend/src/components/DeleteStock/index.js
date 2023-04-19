import React, { useState } from "react";
import './../../css/Style.css';

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
  
      // Show success toast
      toast.success('Drug deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    return (
        <div className="main-container1">
          
        </div>
      );
}

export default DeleteStock;