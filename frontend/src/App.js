import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ViewAppointment from './components/ViewAppointment';
import UpdateAppointment from './components/UpdateAppointment';
import PatientHistory from './components/PatientHistory';
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import AddStock from './components/AddStock';
import GetAttendance from './components/GetAttendance';
import GenerateBill from './components/GenerateBill';
import ViewAttendance from './components/ViewAttendance';
import UpdateStock from './components/UpdateStock';
import ViewStock from './components/ViewStock';
import AddAppointment from './components/AddAppoinment';
import AddAppointment2 from './components/AddAppoinment2';
import ViewLowStock from './components/ViewLowStock';
import ViewShortExpiry from './components/ViewShortExpiry';
import Navbar from './components/Navbar';
import ViewEndpoints from './components/ViewEndpoints';
import ViewGeneratingBill from './components/ViewGeneratingBill';
import Sidebar from './components/SideBar';


const hideDashboardComponentRoutes = ['/', '/view_endpoints', '/dashboard'];

function App() {
  const location = useLocation();
  const shouldRenderDashboardComponents = !hideDashboardComponentRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderDashboardComponents && <Navbar />}
      {shouldRenderDashboardComponents && <Sidebar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='add_appointment' element={<AddAppointment />} />
        <Route path='add_appointment2' element={<AddAppointment2 />} />
        <Route path='view_appointment' element={<ViewAppointment />} />
        <Route path='update_appointment' element={<UpdateAppointment />} />
        <Route path='patient_history' element={<PatientHistory />} />
        <Route path='add_stock' element={<AddStock />} />
        <Route path='update_stock' element={<UpdateStock />} />
        <Route path='view_lowstock' element={<ViewLowStock />} />
        <Route path='view_shortexpiry' element={<ViewShortExpiry />} />
        <Route path='get_attendance' element={<GetAttendance />} />
        <Route path='view_attendance' element={<ViewAttendance />} />
        <Route path='view_stock' element={<ViewStock />} />
        <Route path='generate_bill' element={<GenerateBill />} />
        <Route path='view_endpoints' element={<ViewEndpoints />} />
        <Route path='view_generatingbills' element={<ViewGeneratingBill />} />
      </Routes>
    </>
  );
}

export default App;
