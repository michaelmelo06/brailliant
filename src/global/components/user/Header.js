import React, { useState, useEffect } from 'react';
import './Header.css'
import DropDownMenu from './DropDownMenu';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <>
            <div className='header-container'>
                <input className='header-search' type='text' placeholder='Find a book' />
                <nav onClick={toggleDropdown}>
                    <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                    <p>{users.user_fname}</p>
                </nav>
            </div>
            {showDropdown && <DropDownMenu />}
        </>
    )
}
