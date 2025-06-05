import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

import './LandingPage.css'
import './SignInModal.css'


export default function LandingPage() {
    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState([])

    
    useEffect(() => {
        axios.get('http://localhost:8000/api/allusers')
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/alladmins')
            .then((response) => {
                console.log(response.data)
                setAdmin(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])




    const clearForm = () => {
        setEmail('')
        setPassword('')
    };

    const handleLogin = () => {

        const afound = admin.admins.find(a => a.admin_email === email && a.admin_password === password);

        console.log(admin.admins)
        if (afound) {

            axios.put(`http://localhost:8000/api/update/user/${afound._id}`, {
                admin_last_in: new Date()
            })


            console.log(afound)
            localStorage.setItem('admin', JSON.stringify(afound));
            navigate('/admin/home');
            return
        }

        /*
        else {
          alert('Your password or email was incorrect. Please double-check.');
          clearForm();
          navigate('/home');
        }
        */

        const found = users.users.find(a => a.user_email === email && a.user_password === password);

        if (found) {

            axios.put(`http://localhost:8000/api/update/user/${found._id}`, {
                user_last_in: new Date()
            })

            console.log(found)
            localStorage.setItem('users', JSON.stringify(found));
            navigate('/home');
        } else {
            alert('Your password or email was incorrect. Please double-check.');
            clearForm();
            navigate('/');
        }


    };



    const toggleModal = () => {
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='landing-page-container' >

            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal} ></div>
                    <div className='modal-content'>


                        <div className='loginmodal'>

                            <button className='close-modal' onClick={toggleModal}>x </button>
                            <h2>Sign In</h2>
                            <br />

                            <p>Email</p>
                            <input
                                placeholder='Enter email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            <p>Password</p>
                            <input
                                placeholder='Enter password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </input>
                            <br />





                            <button className='login-modal' onClick={handleLogin} >Login</button>
                        </div>
                    </div>

                </div>

            )}


            <div className='landing-page-header'>
                <img className='landing-page-logo' src={require('../../../../global/asset/Brailliant-Logo.png')} /><br />
                <nav>
                    <button className='sign-in-btn' onClick={toggleModal} >SIGN IN</button>
                </nav>
            </div>
            <div className='landing-page-body'>
                <div className='landing-page-hero'>
                    <label>EMPOWER</label><br />
                    <label>BRILLIANT MINDS</label><br />
                </div>

            </div>



        </div>

    )
}
