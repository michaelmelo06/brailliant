import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import './EditProfile.css'
import './EditProfileHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation';
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios';

export default function EditProfile() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [editUser, setEditUser] = useState({
        user_fname: '',
        user_lname: '',
        user_email: '',
        user_dob: '',
        user_password: '',
        user_img: ''
    });
    const [auditTrail, setAuditTrail] = useState({
        at_action: '',
        at_date: '',
        at_user: '',
    });

    const [cpassword, setCpassword] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState('')



    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('users'));
        if (storedUser) {
            setUsers(storedUser);
            setEditUser(storedUser);
        }
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, []);

    const confirmPassword = () => {
        const { user_fname, user_lname, user_email, user_dob, user_password } = editUser;

        if (!user_fname.trim()) {
            alert("First name is required.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(user_fname)) {
            alert("First name must contain only letters.");
            return;
        }

        if (!user_lname.trim()) {
            alert("Last name is required.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(user_lname)) {
            alert("Last name must contain only letters.");
            return;
        }

        if (!user_email.trim()) {
            alert("Email is required.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email)) {
            alert("Invalid email format.");
            return;
        }

        if (!user_dob) {
            alert("Date of Birth is required.");
            return;
        }
        const today = new Date();
        const enteredDate = new Date(user_dob);
        if (enteredDate > today) {
            alert("Date of Birth cannot be in the future.");
            return;
        }
/** 
        if (!user_password) {
            alert("Password is required.");
            return;
        }

        if (user_password !== cpassword) {
            alert("Passwords do not match!");
            return;
        }
*/
        //submitimage(editUser._id)
        handleProfileUpdate(editUser._id);
        alert("Update Successful!");
    };


    const handleProfileUpdate = async (id) => {
        try {
            // 1. Upload Image (if any)
            let updatedImage = null;
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const result = await axios.put(
                    `http://localhost:8000/upload-profile-icon/${id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                updatedImage = result.data.user.user_img;
                setEditUser(prev => ({ ...prev, user_img: updatedImage }));
                setUsers(prev => ({ ...prev, user_img: updatedImage }));
                setImageName('Image updated: ' + updatedImage);
                console.log('Image updated to:', updatedImage);
            }

            // 2. Update Profile Data
            const updatedData = {
                ...editUser,
                user_recent_act: 'Edited Profile',
                ...(updatedImage && { user_img: updatedImage }) // If image was updated
            };

            await axios.put(`http://localhost:8000/api/update/user/${id}`, updatedData);

            // 3. Update localStorage and state
            localStorage.setItem('users', JSON.stringify(updatedData));
            setEditUser(prev => ({ ...prev, user_password: '' }));
            setCpassword('');
            setUsers(updatedData);
            navigate(0);

            // 4. Log to Audit Trail
            const newAudit = {
                at_user: users.user_email,
                at_date: new Date(),
                at_action: 'Edited Profile'
            };
            setAuditTrail(newAudit);
            await axios.post('http://localhost:8000/api/newaudittrail', newAudit);

            console.log('Profile updated:', updatedData);
            console.log('Audit trail logged:', newAudit);

        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };



    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='ep-container'>
                <div className='ep-header'>
                    <label>Edit Profile</label>
                    <nav onClick={toggleDropdown}>
                        <img
                            className='icon'
                            src={
                                users.user_img
                                    ? require(`../../../../images/${users.user_img}`)
                                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            }
                        />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='ep-body'>
                    <div className="profile-page">
                        <main className="profile-container">
                            <h1>Your Profile</h1>
                            <div className="profile-grid">

                                <div className="profile-table">

                                    <img
                                        className='edit-profile-img'
                                        src={
                                            selectedImage
                                                ? selectedImage
                                                : users?.user_img
                                                    ? require(`../../../../images/${users.user_img}`)
                                                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                        }
                                        alt="Preview"
                                    />

                                    <label for="image-upload" className='edit-profile-upload'>
                                        <img src={require('../assets/upload.png')} />Upload Picture
                                    </label>

                                    <input
                                        id='image-upload'
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => {
                                            setImage(e.target.files[0])
                                            const file = e.target.files?.[0]
                                            setSelectedImage(
                                                file ? URL.createObjectURL(file) : undefined
                                            )
                                        }}
                                        required
                                    />
                                </div>
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
                                        {/** 
                                        <p>Password</p>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            value={editUser.user_password}
                                            onChange={(e) => setEditUser({ ...editUser, user_password: e.target.value })}
                                        />

                                        <p>Confirm Password</p>
                                        <input
                                            type="password"
                                            placeholder="Re-enter new password"
                                            value={cpassword}
                                            onChange={(e) => setCpassword(e.target.value)}
                                        />
*/}
                                        <div className="form-actions">
                                            <button onClick={confirmPassword} className="editsave-btn">Save</button>
                                            <button onClick={() => { navigate('/profile') }} type="button" className="cancel-btn">Back</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
