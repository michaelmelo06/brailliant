import React, { useState, useEffect } from 'react';
import './AdminCreateAccount.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'


export default function AdminCreateAccount() {

    const [title,setTitle] = useState('Create Account')
    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-cs-container'>
                <div className='admin-cs-header'>
                    <AdminHeader title = {title} />
                </div>
                <div className='admin-cs-body'>
                    <div className='admin-create-account'>
                        <label className='create-acc-title'>Create Account</label>
                        <div className='admin-create'>
                            <div className='create-upload'>
                                <img className='ca-upload-img' src={require('../assets/upload.png')} />
                                <button><img  src={require('../assets/upload.png')} />Upload Picture</button>
                            </div>
                            <div className='create-acc-details'>
                                <div className='cad'>
                                    <div className='cad-details'>
                                        <label>ID:</label>
                                        <input />
                                    </div>
                                    <div className='cad-details'>
                                        <label>Email:</label>
                                        <input />
                                    </div>
                                </div>
                                <div className='cad'>
                                    <div className='cad-details'>
                                        <label>First Name:</label>
                                        <input />
                                    </div>
                                    <div className='cad-details'>
                                        <label>Last Name:</label>
                                        <input />
                                    </div>
                                </div>
                                <div className='cad'>
                                    <div className='cad-details'>
                                        <label>Date of Birth:</label>
                                        <input type='date' />
                                    </div>
                                    <div className='cad-details'>
                                        <label>Gender:</label>
                                        <select>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>


                                </div>
                                <button className='admin-create-btn'><img src={require('../assets/upload.png')} /> Create Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
