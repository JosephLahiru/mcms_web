import React from 'react';
import './App.css';
import AddStock from './components/AddStock';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetAttendance from './components/GetAttendance';

    function App() {
      return (
        <div className="App">
          {/* <AddStock/> */}
          <GetAttendance/>
        </div>
      );
    }

export default App;
