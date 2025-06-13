import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AccountActivation.css'
import './AccountActivationHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios';
import './SignInModal.css'

export default function AccountActivation() {
    const hasSentEmail = useRef(false);
    const navigate = new useNavigate()

    const [modal, setModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [editUser, setEditUser] = useState([])

    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }



    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
        setEditUser(JSON.parse(localStorage.getItem('users')))


        const newOtp = generateOTP();
        setOtp(newOtp);
        sendEmail(newOtp);
        hasSentEmail.current = true;
    }, [0])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const sendEmail = async (generatedOtp) => {
        try {
            const response = await axios.post('http://localhost:8000/send-email', {
                subject: "Hello from React!",
                text: "This is a plain text email.",
                html: "<h3>This is your account activation OTP</h3>" + generatedOtp
            });
            alert("Email sent!");
        } catch (err) {
            console.error("Failed to send email", err);
            alert("Failed to send email");
        }
    };

    const generateOTP = () => {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    };

    const handleVerify = async () => {
        const updatedData = { ...editUser, user_status: "Activated" };

        if (inputOtp === otp) {
            axios.put(`http://localhost:8000/api/update/user/${users._id}`, updatedData)
                .then(() => {
                    console.log(updatedData, "this after update");
                    localStorage.setItem('users', JSON.stringify(updatedData));
                    setUsers(updatedData);
                    toggleModal()
                })
                .catch((error) => {
                    console.log(error);
                });

            const newAudit = {
                at_user: users.user_email,
                at_date: new Date(),
                at_action: 'Activated Account'
            };
            await axios.post('http://localhost:8000/api/newaudittrail', newAudit);
        }
        else {
            alert("Invalid OTP.");
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
        <div className='container'>
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal} ></div>
                    <div className='otp-modal-content'>
                        <div className='otp-loginmodal'>
                            <button className='close-modal' onClick={toggleModal}>x </button>
                            <label className='otp-head'>Verification Successful</label>
                            <label className='otp-text'>Explore more of Brailliant features for activated users!</label>
                            <img src={require('../assets/check.png')} />

                            <button className='otp-login-modal' onClick={() => { navigate('/profile') }}>Proceed</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <SideNavigation />
            </div>
            <div className='aa-container'>
                <div className='aa-header'>

                    <label>Account Activation</label>
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
                <div className='aa-body'>
                    <div className='account-activation'>
                        <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>

                        <label className='aa-title'>Account Activation</label>
                        <div className='aa'>
                            <img className='mail' src={require('../assets/mail.png')} />
                            <label className='aa-title'>We just sent an Email</label>
                            <label className='aa-text'>Enter the One-Time-Pin (OTP) we have sent in your email</label>
                            <input
                                placeholder='Enter OTP'
                                value={inputOtp}
                                onChange={(e) => setInputOtp(e.target.value)}
                            />
                            <button className='verify-btn' onClick={handleVerify} >Verify</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
