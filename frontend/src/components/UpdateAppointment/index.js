import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';



function UpdateAppointment() { 
  const [patientName, setPatientName] = useState("");
  const [area, setarea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState(false);
 


  const navigate = useNavigate();


  return (
   
  );
}
 
   export default UpdateAppointment;


   