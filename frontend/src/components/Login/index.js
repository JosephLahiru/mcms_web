import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonFill, BsLockFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
        navigate('/dashboard', {replace:true});
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className='login-background'>
      <div className="login-container">
        <h1 className='login-topic-text'>M</h1>
        <div className="login-box">
          <h2 className="login-form-topic">Welcome Back!</h2>
          <h2 className='login-form-subtopic'>Login to continue.</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input
                type="text"
                id="username"
                className="login-frm-control"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                required
              />
              <BsPersonFill className="login-input-icon" />
            </div>
            <div className="login-form-group">
              <input
                type="password"
                id="password"
                className="login-frm-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <BsLockFill className="login-input-icon" />
            </div>
            <center>
              <button type="submit" className="btn btn-primary login-submit-btn">
                  Login
              </button>
            </center>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
