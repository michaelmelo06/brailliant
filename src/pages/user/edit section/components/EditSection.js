import React, { useState, useEffect } from 'react';
import './EditSection.css'
import './EditSectionHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function EditSection() {

    const navigate = new useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    const [section, setSection] = useState([])
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])

    const [selectedRowId, setSelectedRowId] = useState(null);


    const location = useLocation();
    const selectedSection = location.state?.section;

    console.log('eto oh', section)

    useEffect(() => {
        if (selectedSection) {
            axios
                .get(`http://localhost:8000/api/section/${selectedSection}`)
                .then((response) => {
                    console.log("Full section data:", response.data);
                    setSection(response.data.section);
                })
                .catch((error) => {
                    console.log("Section fetch error: ", error);
                });
        }

        axios.get('http://localhost:8000/api/allstudents')
            .then((response) => setStudents(response.data))
            .catch((error) => console.log("Student fetch error: " + error));

        setUsers(JSON.parse(localStorage.getItem('users')));
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/delete/student/${selectedRowId._id}`)
            .then((response) => {
                console.log("Full section data:", response.data);
                window.location.reload();

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
            <div className='es-container'>
                <div className='es-header'>
                    <label>Edit Section</label>
                    <nav onClick={toggleDropdown}>
                        <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='es-body'>
                    <div className='edit-sect'>
                        <div className='es-title'>
                            <label className='level-section'>
                                {section?.section_level ?? 'Loading...'} {section?.section_name ?? ''}
                            </label>
                            <div className='es-students'>
                                <div className='es-students-img'>
                                    <img src={require('../assets/students.png')} />
                                </div>
                                <div className='es-students-count'>
                                    <label className='count'>
                                        {students.students?.filter(student => student.student_section === selectedSection).length || 0}
                                    </label>
                                    <label className='c'>STUDENTS</label>
                                </div>
                            </div>
                        </div>
                        <div className='es-navigate'>
                            <div className='es-left'>
                                {/*<input className='es-search' placeholder='Search student' />*/}
                            </div>
                            <div className='es-buttons'>
                                <button onClick={() => {
                                    if (!selectedRowId) {
                                        alert("Please select a student.");
                                        return;
                                    }
                                    navigate('/student/view', { state: selectedRowId })

                                }}>Edit Details  <img src={require('../assets/edit.png')} /></button>
                                <button
                                    onClick={() => {
                                        if (!selectedRowId) {
                                            alert("Please select a student.");
                                            return;
                                        }
                                        handleDelete()
                                    }}

                                >Remove <img src={require('../assets/remove.png')} /></button>
                            </div>
                        </div>
                        <div className='es-table'>
                            <table >
                                <tr>
                                    <th>ID</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Initial</th>
                                    <th>Birthdate</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                </tr>
                                {students.students
                                    ?.filter((student) =>
                                        selectedSection ? student.student_section === selectedSection : true
                                    )
                                    .map((student) => (
                                        <tr
                                            key={student._id}
                                            onClick={() => setSelectedRowId(student)}
                                            className={selectedRowId === student ? "highlighted" : ""}
                                        //onClick={() => navigate('/student/view', { state: student })}
                                        >
                                            <td>{student._id}</td>
                                            <td>{student.student_lname}</td>
                                            <td>{student.student_fname}</td>
                                            <td>{student.student_mi}</td>
                                            <td>{new Date(student.student_dob).toLocaleDateString()}</td>
                                            <td>{student.student_age}</td>
                                            <td>{student.student_gender}</td>
                                        </tr>
                                    ))}
                            </table>
                        </div>
                        <button onClick={() => { navigate('/class') }} className='es-save'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
