import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import validator from 'validator'
const Signup = () => {

    //   const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [errorRollNo, setErrorRollNo] = useState('');

    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { createUser } = UserAuth();
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    const roll = /^[a-zA-Z]{2}\d{2}[a-zA-Z]\d{3}$/i;

    const errorStyle = { background: 'black', borderRadius: '0.2rem', padding: '1rem', fontSize: '12px' };
    function validateRollNo(value) {
        // return regex.test(input);
        if (roll.test(value)) {
            setErrorRollNo('Valid Roll No');
        } else {
            setErrorRollNo("Invalid Roll No");
        }
    }
    // const [isValidRollNo, setIsValidRollNo] = useState('');

    const validatePassword = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('Is Strong Password')
        } else {
            setErrorMessage('Is Not Strong Password')
        }
    }
    const signupErrorMessage = (message) => {
        toast.error(`${message}`, {
            position: toast.POSITION.TOP_CENTER
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let email = rollNo + '@smail.iitm.ac.in';
        try {
            await createUser(email, password);
            navigate('/account');
        } catch (e) {
            setError(e.message);
            signupErrorMessage(e.message);
            console.log(e.message);
        }
    };

    return (
        <div className='container bg-gray-100 rounded-md  max-w-[500px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl text-center  font-bold py-2'>Sign up for a free account</h1>
                <p className='py-2 text-center'>
                    Already have an account yet?{' '}
                    <Link to='/signin' >
                        <Button variant="contained" className='  border-blue-500 bg-blue-600 hover:bg-blue-500  p-4 my-2 text-white'>
                            Sign In
                        </Button>
                    </Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <TextField size='small' onChange={(e) => setName(e.target.value)}
                        className='border p-3'
                        type='text'
                        value={name}
                        name='name' label="Name" variant="outlined" />

                </div>
                <div className='flex flex-col py-2'>

                    <TextField size='small' autoComplete='new-password' onChange={(e) => {
                        setRollNo(e.target.value)
                        validateRollNo(e.target.value)
                    }}
                        className='border p-3'
                        type='text'
                        value={rollNo} label="Roll no" variant="outlined" />
                    <br />
                    {
                        errorRollNo === 'Valid Roll No' ? (<div style={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}>{errorRollNo}</div>) : errorRollNo === 'Invalid Roll No' ? (<div style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>
                            <div style={errorStyle}>
                                <p>{errorRollNo}</p>
                                <p>rollNo example: ch21b098</p>
                            </div>

                        </div>) : null
                    }


                </div>
                <div className='flex flex-col py-2'>

                    <TextField size='small' onChange={(e) => setContactNo(e.target.value)}
                        className='border p-3'
                        type='text'
                        value={contactNo}
                        name="contactno" label="Contact no." variant="outlined" />

                </div>
                <div className='flex flex-col py-2'>

                    <TextField size='small'
                        onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                        onChange={(e) => setDob(e.target.value)}
                        className='border p-3'
                        type='date'
                        value={dob}
                        name="dob"
                        label="DOB"
                    />
                </div>

                <div className='flex flex-col py-2'>


                    <TextField size='small'
                        autoComplete='new-password'
                        className='border p-3'
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        variant="outlined"
                        name='password'
                    />
                    <br />

                    {
                        errorMessage === 'Is Strong Password' ? (<div style={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}>{errorMessage}</div>) : errorMessage === 'Is Not Strong Password' ? (<div style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>
                            <div style={errorStyle}>
                                <p>{errorMessage}</p>
                                <p> Minimum 8 characters, Maximum 20 characters , At least one uppercase character,
                                    At least one lowercase character, At least one digit, At least one special character</p>
                            </div>
                        </div>) : null
                    }

                </div>
                <Button type="submit" variant="contained" className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Sign Up
                </Button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default Signup;
