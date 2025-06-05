import React, { useState, useEffect } from "react";
import axios from 'axios'
import { NavBarInAdmin } from '../../admin/NavBarInAdmin';
import './AuditTrail.css'
import { useNavigate } from 'react-router-dom';

export default function AuditTrail() {
    const navigate = useNavigate();

    const [auditTrail, setAuditTrail] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/api/allaudittrail')
            .then((response) => {
                setAuditTrail(response.data)
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
                    <h1>Audit Trail</h1>
                    <p>Track and review user activities and system changes</p>
                </div>

                <div className='mid-account-subcontainer'>
                    <table border="1">
                        <tr>
                            <th>Action</th>
                            <th>User</th>
                            <th>Date</th>
                        </tr>

                        {auditTrail.audit_trail?.map((at) => (
                            <tr
                                key={at._id}
                                onClick={() => navigate('/admin/update', { state: at })}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{at.at_action}</td>
                                <td>{at.at_user}</td>
                                <td>{at.at_date}</td>
                                
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
