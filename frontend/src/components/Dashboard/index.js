import React from 'react';
import Navbar from './../Navbar';
import SideBar from './../SideBar';
import WelcomePage from '../WelcomePage';

const Dashboard = () => {
  return (
    <>
      <Navbar/>
      <SideBar/>
      <WelcomePage/>
    </>
  );
};

export default Dashboard;