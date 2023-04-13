import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const logoutSuccessMessage = () => {
    toast.success('You are logged out', {
      position: toast.POSITION.TOP_CENTER
    });
    // alert("You logged out");

  };
  const logoutErrorMessage = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER
    });

  };
  const handleLogout = async () => {
    try {
      await logout();
      logoutSuccessMessage();
      navigate('/');
    } catch (e) {
      logoutErrorMessage(e.message);
      console.log(e.message);
    }
  };
  var rollNo = user.email.split('@')[0];
  return (
    <div className='container text-center rounded-md bg-slate-100 max-w-[400px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Roll No: {user && rollNo}</p>

      <Button sx={{mt: 5}} variant="contained" onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </Button>
      <ToastContainer/>
    </div>
  );
};

export default Account;
