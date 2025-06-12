import React, { useState, useEffect } from 'react';
import AdminDropDownMenu from './AdminDropDownMenu';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import './AdminHeader.css'

export default function AdminHeader(theTitle) {

    const navigate = useNavigate()

    const adminn = JSON.parse(localStorage.getItem('admin'));
    if (!adminn) {
        navigate(-1)
    }

    const [title, setTitle] = new useState('')
    const [admin, setAdmin] = new useState([])
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem('admin')))
        console.log(admin)
        setTitle(theTitle.title)
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className='header-container'>
            {showDropdown && <AdminDropDownMenu />}
            <label className='admin-header-title'>{title}</label>
            <nav onClick={toggleDropdown}>
                <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                <p>{admin.admin_fname}</p>
            </nav>
        </div>
    )
}
