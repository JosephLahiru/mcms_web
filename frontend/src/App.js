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

  const [currentUser, setCurrentUser] = React.useState(() => {
    const storedUser = localStorage.getItem('mcms_user_data');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const location = useLocation();
  const shouldRenderDashboardComponents = !hideDashboardComponentRoutes.includes(location.pathname);

  const resetCurrentUser = (message)=>{
    setCurrentUser(null);
    localStorage.removeItem('mcms_user_data');
  };

  const _setUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('mcms_user_data', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user: currentUser, resetUser: resetCurrentUser, setUser: _setUser }}>
      {shouldRenderDashboardComponents && <Navbar />}
      {shouldRenderDashboardComponents && <Sidebar />}
      <Routes>

        <Route path="/" element={<LoginRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/login" element={<LoginRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/add_appointment" element={<PrivateRoute />}>
          <Route index element={<AddAppointment />} />
        </Route>

        <Route path="/add_appointment1" element={<PrivateRoute />}>
          <Route index element={<AddAppointment1 />} />
        </Route>

        <Route path="/add_appointment2" element={<PrivateRoute />}>
          <Route index element={<AddAppointment2 />} />
        </Route>

        <Route path="/view_appointment" element={<PrivateRoute />}>
          <Route index element={<ViewAppointment />} />
        </Route>

        <Route path="/view_appointment1" element={<PrivateRoute />}>
          <Route index element={<ViewAppointment1 />} />
        </Route>

        <Route path="/view_appointment2" element={<PrivateRoute />}>
          <Route index element={<ViewAppointment2 />} />
        </Route>

        <Route path="/update_appointment/:id" element={<PrivateRoute />}>
          <Route index element={<UpdateAppointment />} />
        </Route>

        <Route path="/patient_history" element={<PrivateRoute />}>
          <Route index element={<PatientHistory />} />
        </Route>

        <Route path="/add_stock" element={<PrivateRoute />}>
          <Route index element={<AddStock />} />
        </Route>

        <Route path="/update_stock/:id" element={<PrivateRoute />}>
          <Route index element={<UpdateStock />} />
        </Route>

        <Route path="/view_lowstock" element={<PrivateRoute />}>
          <Route index element={<ViewLowStock />} />
        </Route>

        <Route path="/view_shortexpiry" element={<PrivateRoute />}>
          <Route index element={<ViewShortExpiry />} />
        </Route>

        <Route path="/get_attendance" element={<PrivateRoute />}>
          <Route index element={<GetAttendance />} />
        </Route>

        <Route path="/view_attendance" element={<PrivateRoute />}>
          <Route index element={<ViewAttendance />} />
        </Route>

        <Route path="/view_stock" element={<PrivateRoute />}>
          <Route index element={<ViewStock />} />
        </Route>

        <Route path="/generate_bill" element={<PrivateRoute />}>
          <Route index element={<GenerateBill />} />
        </Route>

        <Route path="/view_endpoints" element={<PrivateRoute />}>
          <Route index element={<ViewEndpoints />} />
        </Route>

        <Route path="/view_generatingbills" element={<PrivateRoute />}>
          <Route index element={<ViewGeneratingBill />} />
        </Route>

        <Route path="/return_patients_report" element={<PrivateRoute />}>
          <Route index element={<ReturnPatientsReport />} />
        </Route>

      </Routes>
      </UserContext.Provider>
  );
}

export default App;
