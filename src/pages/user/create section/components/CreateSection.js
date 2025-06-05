import React, { useState, useEffect } from 'react';
import './CreateSection.css'
import './CreateSectionHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios'


export default function CreateSection() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
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

    const handleCreateSection = async () => {
        const updatedData = { user_recent_act: 'Created Section' };
        axios.put(`http://localhost:8000/api/update/user/${users._id}`, updatedData)
            .then(() => {
                console.log(updatedData, "this after update");
            })
            .catch((error) => {
                console.log(error);
            });

        if (!newSection.section_level) {
            alert("Please select a section.");
            return;
        }

        axios.post('http://localhost:8000/api/newsection', newSection)
            .then(() => {
                alert("Section created successfully!");
                clearForm();
            })
            .catch((error) => {
                console.log(error);
            });

        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Created Section'
        };
        setAuditTrail(newAudit);
        console.log(newAudit);
        await axios.post('http://localhost:8000/api/newaudittrail', newAudit);
    };

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

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
                        <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='createsection-body'>
                    <div className='cre-s'>
                        <div className='cre-try'>
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
                                    <button onClick={handleCreateSection} className='sect-save'>Save</button>
                                </div>
                            </form>
                            <div className='cr-frm'>
                                <form className='section-form'>



                                    <h2>Add Student</h2>
                                    <label>ID:</label>
                                    <input
                                        className='student-id'
                                        required
                                    />
                                    <label>Last Name</label>
                                    <input
                                        className='last-name'
                                        required
                                    />
                                    <div className='c1'>
                                        <div className='c2'>
                                            <label>First Name</label>
                                            <input
                                                className='first-name'
                                                required
                                            />
                                        </div>
                                        <div className='c2'>
                                            <label>Middle Initial</label>
                                            <input
                                                className='middle-initial'
                                                required
                                            />

                                        </div>
                                    </div>
                                    <div className='c1'>
                                        <div className='c2'>
                                            <label>Date of Birth</label>
                                            <input
                                                className='dob'
                                                required
                                            />
                                        </div>
                                        <div className='c2'>
                                            <label>Gender</label>
                                            <input
                                                className='gender'
                                                required
                                            />

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
                                                <th>ID</th>
                                                <th>Last Name</th>
                                                <th>First Name</th>
                                                <th>Middle Initial</th>
                                                <th>Birthdate</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                            </tr>

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
