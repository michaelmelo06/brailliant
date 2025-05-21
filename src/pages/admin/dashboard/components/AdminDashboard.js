import React from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { NavBarInAdmin } from '../../NavBarInAdmin';


const AdminDashboard = () => {
    const navigate = useNavigate();


    return (
        <div className="admindashboard-container">
            <NavBarInAdmin></NavBarInAdmin>
            <h2 className="admindashboard-title">Dashboard</h2>
            <div className="admincard-container">
                <div className="admincard" onClick={()=>{navigate('/admin/account')}}>
                    <div className="admindashboard-icon ">☒</div>
                    <h3>Accounts</h3>
                    <p>View list of accounts</p>
                </div>

                <div className="admincard" onClick={()=>{navigate('/admin/create')}}>
                    <div className="admindashboard-icon " >☒</div>
                    <h3>Create Account</h3>
                    <p>Create new account</p>
                </div>

                <div className="admincard" onClick={()=>{navigate('/admin/audittrail')}}>
                    <div className="admindashboard-icon ">☒</div>
                    <h3>Audit Trail</h3>
                    <p>View user actions</p>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;