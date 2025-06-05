import './NavBarIn.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './ProfileModal.css'

export const NavBarIn = () => {
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('users')
    navigate('/home')
  }

  const toggleModal = () => {
    setModal(!modal)
    setUsers(JSON.parse(localStorage.getItem('users')))
    console.log(JSON.parse(localStorage.getItem('users')))
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
        <Link to={'/dashboard'}><img className='logo' src={require('../assets/Brailliant-Logo2.png')} /></Link>

        <nav>
          <a href="/home">About Us</a>
          <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' onClick={toggleModal} />

        </nav>
      </header>
      {modal && (
        <div className='profile-modal'>
          <div className='profile-overlay' onClick={toggleModal} ></div>
          <div className='profile-modal-content'>
            <img className='profile-icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' alt="Avatar" />
            <p>Account ID:</p>
            <p>{users._id}</p>
            <h1>{users.user_fname.charAt(0).toUpperCase() + users.user_fname.slice(1)} {users.user_lname.charAt(0).toUpperCase() + users.user_lname.slice(1)} </h1>
            <h3>{users.user_email}</h3>

            <Link to={'/profile/edit'}><button className='edit'>Edit Profile</button><br /></Link>
            <button onClick={logout} className='logout'>Log out</button>
          </div>

        </div>

      )}

    </>
  )
} 