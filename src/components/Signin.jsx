import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
  const [rollNo, setRollNo] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const loginSuccessMessage = (email) => {
    toast.success(`${email} signed in`, {
      position: toast.POSITION.TOP_CENTER
    });
    //  alert('logged in'); 
    // alert(`${email} just signed in`);
  };
  const loginErrorMessage = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let email = rollNo + '@smail.iitm.ac.in';

    try {
      await signIn(email, password);
      navigate('/account');
      loginSuccessMessage(email);


    } catch (e) {
      setError(e.message);
      loginErrorMessage(e.message);
      console.log(e.message);
      // alert(e.message);
    }
  };

  return (
    <div className='container bg-gray-100 rounded-md max-w-[500px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl text-center  font-bold py-2'>Sign in to your account</h1>
        <p className='py-2 text-center '>
          Don't have an account yet?{' '}
          <Link to='/'>
            <Button variant="contained" className=' border-blue-500 bg-blue-600 hover:bg-blue-500 p-4 my-2 text-white'>
              Sign Up
            </Button>
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-1'>
          {/* <label className='py-2 font-medium'>Email Address</label> */}
          <TextField type='text' value={rollNo} size='small' label="Roll no" variant="outlined" onChange={(e) => {
            setRollNo(e.target.value)
            console.log(e.target.value);
          }} className='border p-3 ' />
        </div>
        <div className='flex flex-col py-1'>
          {/* <label className='py-2 font-medium'>Password</label> */}
          <TextField size='small' value={password} label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
        </div>
        <Button type="submit" variant="contained" className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign In
        </Button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Signin;
