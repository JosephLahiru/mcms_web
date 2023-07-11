import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ViewAppointment from './components/ViewAppointment';
import ViewAppointment1 from './components/ViewAppointment1';
import ViewAppointment2 from './components/ViewAppointment2';
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
import AddAppointment1 from './components/AddAppoinment1';
import AddAppointment2 from './components/AddAppoinment2';
import ViewLowStock from './components/ViewLowStock';
import ViewShortExpiry from './components/ViewShortExpiry';
import Navbar from './components/Navbar';
import ViewEndpoints from './components/ViewEndpoints';
import ViewGeneratingBill from './components/ViewGeneratingBill';
import Sidebar from './components/SideBar';
import ReturnPatientsReport from './components/ReturnPatientsReport';

import UserContext from './scripts/userContext';
import PrivateRoute from './scripts/privateRoute';
import LoginRoute from './scripts/loginRoute';

const hideDashboardComponentRoutes = ['/', '/view_endpoints', '/dashboard', '/login'];

function App() {

  const [currentUser, setCurrentUser] = React.useState(null);

  const location = useLocation();
  const shouldRenderDashboardComponents = !hideDashboardComponentRoutes.includes(location.pathname);

  const resetCurrentUser = (message)=>{
    setCurrentUser(null)
  };

  return (
    <UserContext.Provider value={{ user: currentUser, resetUser: resetCurrentUser, setUser: setCurrentUser }}>
      {shouldRenderDashboardComponents && <Navbar />}
      {shouldRenderDashboardComponents && <Sidebar />}
      <Routes>

        <Route path="/" element={<Dashboard />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/login" element={<LoginRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path='add_appointment' element={<AddAppointment />} />
        <Route path='add_appointment1' element={<AddAppointment1 />} />
        <Route path='add_appointment2' element={<AddAppointment2 />} />
        <Route path='view_appointment' element={<ViewAppointment />} />
        <Route path='view_appointment1' element={<ViewAppointment1 />} />
        <Route path='view_appointment2' element={<ViewAppointment2 />} />
        <Route path='update_appointment/:id' element={<UpdateAppointment />} />
        <Route path='patient_history' element={<PatientHistory />} />
        <Route path='add_stock' element={<AddStock />} />
        <Route path='update_stock/:id' element={<UpdateStock />} />
        <Route path='view_lowstock' element={<ViewLowStock />} />
        <Route path='view_shortexpiry' element={<ViewShortExpiry />} />
        <Route path='get_attendance' element={<GetAttendance />} />
        <Route path='view_attendance' element={<ViewAttendance />} />
        <Route path='view_stock' element={<ViewStock />} />
        <Route path='generate_bill' element={<GenerateBill />} />
        <Route path='view_endpoints' element={<ViewEndpoints />} />
        <Route path='view_generatingbills' element={<ViewGeneratingBill />} />
        <Route path='return_patients_report' element={<ReturnPatientsReport />} />
      </Routes>
      </UserContext.Provider>
  );
}

export default App;
