import React, { useState, useEffect } from 'react';
import './Analytics.css'
import './AnalyticsHeader.css'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import axios from 'axios';


export default function Analytics() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    const [studentcount, setStudentCount] = useState(0)
    const [booksCount, setBooksCount] = useState(0)


    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))

        axios.get('http://localhost:8000/api/students/count')
            .then((response) => {
                setStudentCount(response.data.count);
            })
            .catch((error) => {
                console.error('Error fetching student count:', error);
            });

        axios.get('http://localhost:8000/api/books/count')
            .then((response) => {
                setBooksCount(response.data.count);
            })
            .catch((error) => {
                console.error('Error fetching student count:', error);
            });


    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='analytics-container'>
                <div className='analytics-header'>
                    <label>Class Settings</label>
                    <nav onClick={toggleDropdown}>
                        <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='analytics-body'>
                    <div className='analytics'>
                        <div className='analytics-details'>
                            <div className='analytics-student'>
                                <label className='analytics-title'>Students</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>{studentcount}</label>
                                    <img src={require('../assets/Users.png')} />
                                </div>
                            </div>
                            <div className='analytics-books-approved'>
                                <label className='analytics-title'>Books Approved</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>{booksCount}</label>
                                    <img src={require('../assets/Book open.png')} />
                                </div>
                            </div>
                            <div className='analytics-completion-rate'>
                                <label className='analytics-title'>Completion Rate</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>--%</label>
                                    <img src={require('../assets/check.png')} />
                                </div>
                            </div>
                        </div>
                        <div className='analytics-performance'>
                            <div className='analytics-cp'>
                                <label>Class Performance</label>
                                <div className='cp'>

                                </div>
                            </div>
                            <div className='analytics-tb'>
                                <label>Top Books</label>
                                <div className='tb'>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
