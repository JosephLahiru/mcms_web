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
    if (username === '' && password === '') {
        navigate('/dashboard', {replace:true});
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className='login-background'>
      <div className="login-container">
        <div className="login-box">
          <h2 className="form-topic">Welcome Back!</h2>
          <h2 className='form-subtopic'>Login to continue.</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                className="frm-control"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                required
              />
              <BsPersonFill className="input-icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="frm-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <BsLockFill className="input-icon" />
            </div>
            <center>
              <button type="submit" className="btn btn-primary submit-btn">
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
