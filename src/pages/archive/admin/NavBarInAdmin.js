import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './ProfileModal.css'
import './NavBarInAdmin.css';

export const NavBarInAdmin = () => {
  const [modal, setModal] = useState(false)
  const [admin, setAdmin] = useState([])

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('admin')
    navigate('/')
  }

  const toggleModal = () => {
    setModal(!modal)
    setAdmin(JSON.parse(localStorage.getItem('admin')))
    console.log(JSON.parse(localStorage.getItem('admin')))
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
        <nav>
          <a href="/home">About Us</a>
          <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' onClick={toggleModal} />

        </nav>
      </header>
      {modal && (
        <div className='profile-modal'>
          <div className='profile-overlay' onClick={toggleModal} ></div>
          <div className='profile-modal-content'>
            <img className='profile-icon' src='' alt="Avatar" />
            <p>Account ID:</p>
            <p>{admin._id}</p>
            <h1>{admin.admin_fname.charAt(0).toUpperCase() + admin.admin_fname.slice(1)} {admin.admin_lname.charAt(0).toUpperCase() + admin.admin_lname.slice(1)} </h1>
            <h3>{admin.admin_email}</h3>

            <Link to={'/profile/edit'}><button className='edit'>Edit Profile</button><br /></Link>
            <button onClick={logout} className='logout'>Log out</button>
          </div>

        </div>

      )}

    </>
  )
} 