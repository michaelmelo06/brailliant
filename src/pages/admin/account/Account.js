import React, { useState, useEffect } from "react";
import axios from 'axios'
import { NavBarInAdmin } from '../../admin/NavBarInAdmin';
import './Account.css'
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/api/allusers')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    return (
        <>
            <NavBarInAdmin></NavBarInAdmin>
            <div className='adminaccount-container'>


                <div className='top-account-subcontainer'>
                    <h1>Account Page</h1>
                    <p>Manage and view user account information</p>
                </div>

                <div className='mid-account-subcontainer'>
                    <table border="1">
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>Last Login</th>
                            <th>Recent Activity</th>
                        </tr>

                        {users.users?.map((user) => (
                            <tr
                                key={user._id}
                                onClick={() => navigate('/admin/update', { state: user })}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{user.user_lname}</td>
                                <td>{user.user_fname}</td>
                                <td>{user.user_email}</td>
                                <td>{user.user_dob}</td>
                                <td>{user.user_last_in}</td>
                                <td>{user.user_recent_act}</td>
                            </tr>
                        ))}
                    </table>




                </div>
                <div className='bot-account-subcontainer'>
                    <button className='nav'> Prev</button>
                    <button className='nav'> Next</button>

                </div>
            </div >
        </>

    )
}
