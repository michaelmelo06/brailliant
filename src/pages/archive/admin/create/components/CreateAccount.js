import { NavBarInAdmin } from '../../NavBarInAdmin';
import './CreateAccount.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'



export default function CreateAccount() {

    const [newUser, setNewUser] = useState({
        user_fname: '',
        user_lname: '',
        user_email: '',
        user_password: '',
        user_cpassword: '',
        user_dob: '',
    });

    /*
    const createUser = (req, res) => {
        const newUser = new UserModel(req.body)
        newUser.save()
            .then(user => res.json(user))
            .catch(err => {
                console.error(err)
                res.status(500).json({ error: 'Internal Server Error' })
            })
    }
    */

    const confirmPassword = () => {
        if (newUser.user_password === newUser.user_cpassword) {
            handleCreateUser();
        } else {
            alert("Passwords do not match!");
            clearForm();
        }
    };
    const clearForm = () => {
        setNewUser({
            user_fname: '',
            user_lname: '',
            user_email: '',
            user_password: '',
            user_cpassword: '',
            user_dob: '',
        });
    };

    const handleCreateUser = () => {
        axios.post('http://localhost:8000/api/newuser', newUser)
            .then(() => {
                alert("User created successfully!");
                clearForm();
            })
            .catch((error) => {
                console.log(error);
            });
    };








    return (

        <>
            <NavBarInAdmin></NavBarInAdmin>
            <div className='create-container'>

                <div className='top-create-subcontainer'>
                    <h1>Create Account</h1>
                    <p>Create new account</p>
                </div>

                <div className='mid-create-subcontainer'>

                    <div className='create-form-container' >

                        <form className="create-form">
                            <div className='create-form-row1' >
                                <p>First Name</p>
                                <p>Last Name</p>
                            </div>
                            <div className="create-form-row2">
                                <input
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={newUser.user_fname}
                                    onChange={(e) => setNewUser({ ...newUser, user_fname: e.target.value })}

                                />
                                <input
                                    required
                                    type="text"
                                    name="lname"
                                    placeholder="Last Name"
                                    value={newUser.user_lname}
                                    onChange={(e) => setNewUser({ ...newUser, user_lname: e.target.value })}
                                />
                            </div>
                            <p>Email</p>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUser.user_email}
                                onChange={(e) => setNewUser({ ...newUser, user_email: e.target.value })}
                            />



                            <p>Date of Birth</p>
                            <input
                                required
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={newUser.user_dob}
                                onChange={(e) => setNewUser({ ...newUser, user_dob: e.target.value })}
                            />

                            <p>Password</p>
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                value={newUser.user_password}
                                onChange={(e) => setNewUser({ ...newUser, user_password: e.target.value })}
                            />
                            <p>Confirm Password</p>
                            <input
                                required
                                type="password"
                                name="cpassword"
                                placeholder="Enter new password"
                                value={newUser.user_cpassword}
                                onChange={(e) => setNewUser({ ...newUser, user_cpassword: e.target.value })}
                            />
                        </form>
                    </div>

                </div>
                <div className='bot-create-subcontainer'>

                    <button onClick={confirmPassword} className='sync'>Create Account</button>
                </div>
            </div>
        </>

    )
}
