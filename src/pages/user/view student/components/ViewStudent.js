import React, { useState, useEffect } from 'react';
import './ViewStudent.css'
import './ViewStudentHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ViewStudent() {

    const navigate = new useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [student, setStudent] = useState([])


    const location = useLocation();
    const selectedStudent = location.state;
    console.log(selectedStudent)
    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/delete/student/${selectedStudent._id}`)
            .then((response) => {
                console.log("Full section data:", response.data);
                navigate('/class')
            })
            .catch((error) => {
                console.log("Section fetch error: ", error);
            });
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='vs-container'>
                <div className='vs-header'>
                    <label>View Student</label>
                    <nav onClick={toggleDropdown}>
                        <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='vs-body'>

                    <div className='view-student'>
                        <label className='vs-student'>{selectedStudent.student_lname}, {selectedStudent.student_fname}</label>
                        <div className='vs'>
                            <div className='view-student-detail'>
                                
                                <div className='vs2'>
                                    <label>Last Name:</label>
                                    <input value={selectedStudent.student_lname} />
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>First Name:</label>
                                        <input value={selectedStudent.student_fname} />
                                    </div>
                                    <div className='vs2'>
                                        <label>Middle Initial:</label>
                                        <input value={selectedStudent.student_mi} />
                                    </div>
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>Date of Birth:</label>
                                        <input value={new Date(selectedStudent.student_dob).toLocaleDateString()} />
                                    </div>
                                    <div className='vs2'>
                                        <label>Gender:</label>
                                        <input value={selectedStudent.student_gender} />
                                    </div>
                                </div>
                                <div className='vs-buttons'>
                                    <button className='vs-edit'>Edit Details <img src={require('../assets/edit.png')} /></button>
                                    <button className='vs-remove' onClick={handleDelete}>Remove <img src={require('../assets/remove.png')} /></button>
                                </div>
                            </div>
                            <div className='view-student-rh'>
                                <label>Reading History:</label>
                                <div className='reading-history'>
                                    <table>
                                        <tr>
                                            <th>Book</th>
                                            <th>Status</th>
                                            <th>Last Viewed</th>
                                            <th>Time Elapsed</th>
                                            <th>Date</th>

                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}
