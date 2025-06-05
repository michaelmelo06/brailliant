import React, { useState, useEffect } from 'react';
import './AdminDropDownMenu.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


export default function AdminDropDownMenu() {

    const navigate = new useNavigate()

    const [admin, setAdmin] = useState([])

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem('admin')))
    }, [])

    const logout = () => {
        localStorage.removeItem('admin')
        navigate('/')
    }

    return (
        <div className='sub-menu-wrap'>
            <div className='sub-menu'>
                <div className='user-info'>
                    <label >{admin.admin_fname}</label>
                </div>
                <hr />
                {/**
                <a className='sub-menu-link'>
                    <p onClick={() => { navigate('/admin/profile') }}>Profile</p>
                </a> */}
                <a className='sub-menu-link'>
                    <p onClick={logout}>Logout</p>
                </a>
            </div>
        </div>
    )
}
