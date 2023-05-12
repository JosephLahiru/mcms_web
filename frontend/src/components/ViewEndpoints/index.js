import React, { useState, useEffect } from 'react';
import './main.css';

function App() {
  const [endpoints, setEndpoints] = useState(null);

  useEffect(() => {
    async function fetchEndpoints() {
      const response = await fetch('https://mcms_api.mtron.me/get_endpoints');
      const data = await response.json();
      setEndpoints(data);
    }
    fetchEndpoints();
  }, []);

  return (
    <div className="container">
      <h1 className="title">API Endpoints:</h1>
      {endpoints ? (
        <table className="table">
          <thead>
            <tr>
              <th className="header">Endpoint</th>
              <th className="header">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(endpoints).map(([endpoint, description]) => (
              <tr key={endpoint} className="row">
                <td className="cell">{endpoint}</td>
                <td className="cell">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
