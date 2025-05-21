import './NavBar.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import './LoginModal.css'

import React, { useState, useEffect } from "react";
import axios from 'axios'



export const NavBar = () => {
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
      navigate('/admin/dashboard');
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
      navigate('/dashboard');
    } else {
      alert('Your password or email was incorrect. Please double-check.');
      clearForm();
      navigate('/home');
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
    <>
      <header className="header">
        <img className='logo' src={require('../assets/Brailliant-Logo2.png')} />
        <nav>
          <a href="/home">About Us</a>

          <button className="login-btn" onClick={toggleModal}>Log in</button>


        </nav>
      </header>
      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal} ></div>
          <div className='modal-content'>
            <div className='left-loginmodal'>
              <img className='login-logo' src={require('../assets/Brailliant-Logo2.png')} />
              <img className='login-logo' src={require('../assets/login-pic3.png')} />
            </div>

            <div className='right-loginmodal'>

              <button className='close-modal' onClick={toggleModal}>X </button>
              <h2>Log In</h2>
              <br />

              <p>Email</p>
              <input
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} >
              </input>
              <p>Password</p>
              <input
                placeholder='Enter password'
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)} >
              </input>
              <br />



              <ul>
                {users.users?.map((user) => (
                  <li key={user._id}>{user.user_email}</li>
                ))}
              </ul>





              <button className='login-modal' onClick={handleLogin} >Login</button>
            </div>
          </div>

        </div>

      )}

    </>
  )
} 