import React, { useState, useEffect } from 'react';
import './AddStudent.css'
import './AddStudentHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function AddStudent() {


    const navigate = new useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [sections, setSections] = useState([])
    const [selectedSection, setSelectedSection] = useState('')
    const [newStudent, setNewStudent] = useState({
        student_lname: '',
        student_fname: '',
        student_mi: '',
        student_dob: '',
        student_gender: '',
        student_section: '',
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/allsections')
            .then((response) => {
                setSections(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleAddStudent = (e) => {
        e.preventDefault();

        ///////////////////////VALIDATIONS
        if (!newStudent.student_lname.trim()) {
            alert("Last name is required.");
            return;
        }
        if (!newStudent.student_fname.trim()) {
            alert("First name is required.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(newStudent.student_lname)) {
            alert("Last name must contain only letters.");
            return;
        }
        if (!/^[A-Za-z]+$/.test(newStudent.student_fname)) {
            alert("First name must contain only letters.");
            return;
        }
        if (newStudent.student_mi && !/^[A-Za-z]{1}$/.test(newStudent.student_mi)) {
            alert("Middle initial must be a single letter.");
            return;
        }
        if (!newStudent.student_dob) {
            alert("Date of Birth is required.");
            return;
        }

        const today = new Date();
        const enteredDate = new Date(newStudent.student_dob);
        if (enteredDate > today) {
            alert("Date of Birth cannot be in the future.");
            return;
        }
        if (!newStudent.student_gender) {
            alert("Please select a gender.");
            return;
        }
        if (!newStudent.student_section) {
            alert("Please select a section.");
            return;
        }

        /////////////////////////////////////////////////////////////////////
        const updatedData = { user_recent_act: 'Added Student' };
        axios.put(`http://localhost:8000/api/update/user/${users._id}`, updatedData)
            .then(() => {
                console.log(updatedData, "this after update");
            })
            .catch((error) => {
                console.log(error);
            });

        axios.post('http://localhost:8000/api/newstudent', newStudent)
            .then((res) => {
                console.log("Student added:", res.data);
                alert("Student added successfully!");
                setNewStudent({
                    student_lname: '',
                    student_fname: '',
                    student_mi: '',
                    student_dob: '',
                    student_gender: '',
                    student_section: '',
                });
                navigate('/class')
            })
            .catch((error) => {
                console.error("Failed to add student", error);
                alert("Failed to add student. Please try again.");
            });
    };


    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='as-container'>
                <div className='as-header'>
                    <label>Add Student</label>
                    <nav onClick={toggleDropdown}>
                        <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='as-body'>
                    <form className='as'>
                        <div className='as1'>

                            <div className='as2'>
                                <label>Section:</label>
                                <select
                                    value={newStudent.student_section}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_section: e.target.value })}
                                >
                                    <option value="">Select Section</option>
                                    {sections.sections?.map((section) => (
                                        <option key={section._id} value={section._id}>
                                            {section.section_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='as1'>
                            <div className='as2'>
                                <label>Last Name:</label>
                                <input
                                    type='text'
                                    value={newStudent.student_lname}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_lname: e.target.value })}
                                />
                            </div>
                            <div className='as2'>
                                <label>First Name:</label>
                                <input
                                    type='text'
                                    value={newStudent.student_fname}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_fname: e.target.value })}
                                />
                            </div>
                            <div className='as2'>
                                <label>Middle Initial:</label>
                                <input
                                    type='text'
                                    value={newStudent.student_mi}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_mi: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='as1'>
                            <div className='as2'>
                                <label>Date of Birth:</label>
                                <input
                                    type='date'
                                    value={newStudent.student_dob}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_dob: e.target.value })}
                                />
                            </div>
                            <div className='as2'>
                                <label>Gender:</label>
                                <select
                                    value={newStudent.student_gender}
                                    onChange={(e) => setNewStudent({ ...newStudent, student_gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <button className='as-add' onClick={handleAddStudent} > <img src={require('../assets/add.png')} />Add Student</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
