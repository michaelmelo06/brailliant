import React, { useState, useEffect } from 'react';
import './UpdateAccount.css';
import { NavBarInAdmin } from '../../admin/NavBarInAdmin';
import axios from 'axios'
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";


export default function UpdateAccount() {

  const navigate = useNavigate()
  const location = useLocation();
  const data = location.state;


  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState({
    user_fname: '',
    user_lname: '',
    user_email: '',
    user_dob: '',
    user_password: '',
  });



  useEffect(() => {
    setUsers(data);
    setEditUser(data);
  }, [])


 

  const handleUpdateUser = (id) => {
    axios.put(`http://localhost:8000/api/update/user/${id}`, editUser)
      .then(() => {
        console.log(editUser, "this after update")
        localStorage.setItem('users', JSON.stringify(editUser));
        setEditUser({ ...editUser, user_password: '' });
        setUsers(editUser);


      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <>
      <NavBarInAdmin></NavBarInAdmin>
      <div className="profile-page">
        <main className="profile-container">
          <h1>Update Profile</h1>
          <div className="profile-grid">

            <table className="profile-table">

              <tr>
                <td><strong>Last Name:</strong></td>
                <td>{users.user_lname?.charAt(0).toUpperCase() + users.user_lname?.slice(1)}</td>
              </tr>
              <tr>
                <td><strong>First Name:</strong></td>
                <td>{users.user_fname?.charAt(0).toUpperCase() + users.user_fname?.slice(1)}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{users.user_dob}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{users.user_email}</td>
              </tr>
              <tr>
                <td><strong>Password:</strong></td>
                <td>changed 2 months ago</td>
              </tr>

            </table>
            <div className='form-container' >

              <div className="profile-form">
                <div className='form-row1' >
                  <p>First Name</p>
                  <p>Last Name</p>
                </div>
                <div className="form-row2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={editUser.user_fname}
                    onChange={(e) => setEditUser({ ...editUser, user_fname: e.target.value })}

                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={editUser.user_lname}
                    onChange={(e) => setEditUser({ ...editUser, user_lname: e.target.value })}
                  />
                </div>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.user_email}
                  onChange={(e) => setEditUser({ ...editUser, user_email: e.target.value })}
                />
                <p>Date of Birth</p>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={editUser.user_dob}
                  onChange={(e) => setEditUser({ ...editUser, user_dob: e.target.value })}
                />
               
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Enter new password"
                  
                  onChange={(e) => setEditUser({ ...editUser, user_password: e.target.value })}
                />
 {/**
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
 */}
                <div className="form-actions">
                  <button onClick={()=>{handleUpdateUser(editUser._id)}} className="editsave-btn">Save</button>
                  <button onClick={() => { navigate('/admin/account') }} type="button" className="cancel-btn">Cancel</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
