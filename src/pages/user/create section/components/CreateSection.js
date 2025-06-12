import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import './CreateSection.css'
import './CreateSectionHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios'


export default function CreateSection() {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [sectionId, setSectionId] = useState('')
    const [students, setStudents] = useState([])

    const [section, setSection] = useState([])

    const [newStudent, setNewStudent] = useState({
        student_lname: '',
        student_fname: '',
        student_mi: '',
        student_dob: '',
        student_gender: '',
    });
    const [newSection, setNewSection] = useState({
        section_name: '',
        section_level: '',
    });
    const [auditTrail, setAuditTrail] = useState({
        at_action: '',
        at_date: '',
        at_user: '',
    });

    const clearForm = () => {
        setNewSection({
            section_name: '',
            section_level: '',
        });
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        console.log('this the id', sectionId);

        axios.put(`http://localhost:8000/api/update/user/${users._id}`, { user_recent_act: 'Added Student' })

        const updatedData = {
            ...newStudent,
            student_section_name: section.section.section_name,
            student_section: sectionId
        }

        axios.post('http://localhost:8000/api/newstudent', updatedData)
            .then((res) => {
                console.log("Student added:", res.data);
                alert("Student added successfully!");
                setNewStudent({
                    student_lname: '',
                    student_fname: '',
                    student_mi: '',
                    student_dob: '',
                    student_gender: '',
                });
                studentList()
            })
            .catch((error) => {
                console.error("Failed to add student", error);
                alert("Failed to add student. Please try again.");
            });

    };

    const handleCreateSection = async (e) => {
        e.preventDefault();
        if (!newSection.section_level) {
            alert("Please select a section.");
            return;
        }

        axios.put(`http://localhost:8000/api/update/user/${users._id}`, { user_recent_act: 'Created Section' })

        axios.post('http://localhost:8000/api/newsection', newSection, { section_instructor: users._id })
            .then(async (response) => {
                alert("Section created successfully!");
                //clearForm();
                const newId = response.data.section._id;
                setSectionId(newId);
                console.log('ETO YUNG SECTION:', newSection.section_name);

                try {
                    const result = await axios.get(`http://localhost:8000/api/section/${newId}`);
                    setSection(result.data);
                    console.log('newly created:', result.data);
                } catch (fetchError) {
                    console.error("Error fetching newly created section:", fetchError);
                }
            })
            .catch((error) => {
                console.error("Error creating section:", error);
            });



        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Created Section'
        };

        setAuditTrail(newAudit);
        await axios.post('http://localhost:8000/api/newaudittrail', newAudit);
    };

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))


    }, [])

    const studentList = () => {
        axios.get('http://localhost:8000/api/allstudents')
            .then((response) => {
                setStudents(response.data)
                console.log(students)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='createsection-container'>
                <div className='createsection-header'>
                    <label>Create Section</label>
                    <nav onClick={toggleDropdown}>
                        <img
                            className='icon'
                            src={
                                users.user_img
                                    ? require(`../../../../images/${users.user_img}`)
                                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            }
                        />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='createsection-body'>
                    <div className='cre-s'>

                        <div className='cre-try'>
                            <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>

                            <form className='section-create'>
                                <div className='c1'>
                                    <div className='c2'>
                                        <label>Section Name</label>
                                        <input
                                            required
                                            type='text'
                                            className='section-name'
                                            value={newSection.section_name}
                                            onChange={(e) => setNewSection({ ...newSection, section_name: e.target.value })}
                                        />
                                    </div>
                                    <div className='c2'>
                                        <label>Grade Level</label>
                                        <select
                                            required
                                            className='grade-level'
                                            value={newSection.section_level}
                                            onChange={(e) => setNewSection({ ...newSection, section_level: e.target.value })}
                                        >
                                            <option value="">Select Grade</option>
                                            <option value="Grade - 1">Grade - 1</option>
                                            <option value="Grade - 2">Grade - 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleCreateSection} className='sect-save'>Create</button>
                                </div>


                            </form>
                            <div className='cr-frm'>
                                <form className='section-form' onSubmit={handleAddStudent}>
                                    <h2>Add Student</h2>
                                    <label>Last Name</label>
                                    <input
                                        className='last-name'
                                        required
                                        value={newStudent.student_lname}
                                        onChange={(e) => setNewStudent({ ...newStudent, student_lname: e.target.value })}
                                    />
                                    <div className='c1'>
                                        <div className='c2'>
                                            <label>First Name</label>
                                            <input
                                                className='first-name'
                                                required
                                                value={newStudent.student_fname}
                                                onChange={(e) => setNewStudent({ ...newStudent, student_fname: e.target.value })}
                                            />
                                        </div>
                                        <div className='c2'>
                                            <label>Middle Initial</label>
                                            <input
                                                className='middle-initial'
                                                required
                                                type='text'
                                                value={newStudent.student_mi}
                                                onChange={(e) => setNewStudent({ ...newStudent, student_mi: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='c1'>
                                        <div className='c2'>
                                            <label>Date of Birth</label>
                                            <input
                                                className='dob'
                                                required
                                                type='date'
                                                value={newStudent.student_dob}
                                                onChange={(e) => setNewStudent({ ...newStudent, student_dob: e.target.value })}
                                            />
                                        </div>
                                        <div className='c2'>
                                            <label>Gender</label>
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
                                    <div className='create-section-buttons'>
                                        <button type='submit' className='add-section'>Add</button>
                                        <button type='reset' className='clear-form' >Clear</button>
                                    </div>
                                </form>

                                <div className='section-student-list'>
                                    <div className='section-student-list-top'>
                                        <label>Student List</label>
                                        <button className='section-import'><img src={require('../assets/upload.png')} />Import List</button>
                                    </div>
                                    <div className='create-section-students'>
                                        <table>
                                            <tr>
                                                <th>Last Name</th>
                                                <th>First Name</th>
                                                <th>Middle Initial</th>
                                                <th>Birthdate</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                            </tr>

                                            {students.students
                                                ?.filter((student) =>
                                                    sectionId ? student.student_section === sectionId : true
                                                )
                                                .map((student) => (
                                                    <tr
                                                        key={student._id}
                                                        style={{ cursor: 'pointer' }}
                                                    >
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
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
