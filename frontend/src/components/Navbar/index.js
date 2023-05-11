import React from "react";
import "./main.css";

export default function Navbar() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <nav className="navigation">
      <div className="brand-container">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="0 0 64 64"
        >
        <path 
            fill="currentColor" 
            d="M56.609 1.114s-48.788-.015-48.774 0C3.338 1.114.81 3.439.81 8.188v48.966c0 4.443 2.273 6.769 6.766 6.769h49.173c4.493 0 6.769-2.21 6.769-6.769V8.188c.001-4.634-2.275-7.074-6.909-7.074zm-8.343 52.518h-8.302v-17.82H24.469v17.82h-8.301V13.896h8.301v15.053h15.495V13.896h8.302v39.736z"
            />
        </svg>
        <a href="/" className="brand-name">
          MCMS
        </a>
      </div>
      <div className="navigation-menu">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}