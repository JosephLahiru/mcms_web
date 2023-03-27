import React,{useState} from "react";
import "./Patient.css";

function Card() {
  return (
    <div className="card">
      <img src="/w3images/team2.jpg" alt="John" style={{ width: "100%" }} />
      <h1>John Doe</h1>
      <p className="title">CEO &amp; Founder, Example</p>
      <p>Harvard University</p>
      <div style={{ margin: "24px 0" }}>
        <a href="#">
          <i className="fa fa-dribbble"></i>
        </a>
        <a href="#">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="#">
          <i className="fa fa-facebook"></i>
        </a>
      </div>
      <p>
        <button>Contact</button>
      </p>
    </div>
  );
}


