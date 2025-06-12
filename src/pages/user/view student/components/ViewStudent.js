import React, { useState, useEffect } from 'react';
import './ViewStudent.css';
import './ViewStudentHeader.css';
import SideNavigation from '../../../../global/components/user/SideNavigation';
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../../../../global/components/user/DeleteConfirmationModal';

export default function ViewStudent() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const location = useLocation();
    const selectedStudent = location.state;

    const [formData, setFormData] = useState({
        student_fname: '',
        student_lname: '',
        student_mi: '',
        student_dob: '',
        student_gender: ''
    });

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')));
        setFormData({
            student_fname: selectedStudent.student_fname,
            student_lname: selectedStudent.student_lname,
            student_mi: selectedStudent.student_mi,
            student_dob: selectedStudent.student_dob,
            student_gender: selectedStudent.student_gender
        });

    }, [selectedStudent]);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const toggleConfirmation = () => {
        setShowConfirmation((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        axios
            .put(`http://localhost:8000/api/update/student/${selectedStudent._id}`, formData)
            .then((result) => {
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Update failed:", error);
            });

        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Edited Student Detail'
        };
        await axios.post('http://localhost:8000/api/newaudittrail', newAudit);
    };

    const handleCancel = () => {
        setFormData({
            student_fname: selectedStudent.student_fname,
            student_lname: selectedStudent.student_lname,
            student_mi: selectedStudent.student_mi,
            student_dob: selectedStudent.student_dob,
            student_gender: selectedStudent.student_gender
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        axios
            .delete(`http://localhost:8000/api/delete/student/${selectedStudent._id}`)
            .then(() => {
                navigate('/class');
            })
            .catch((error) => {
                console.log("Delete error: ", error);
            });
        const newAudit = {
            at_user: users.user_email,
            at_date: new Date(),
            at_action: 'Removed Student'
        };
        await axios.post('http://localhost:8000/api/newaudittrail', newAudit);
    };

    return (
        <div className='container'>
            <SideNavigation />
            <div className='vs-container'>
                <div className='vs-header'>
                    <label>View Student</label>
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
                {showConfirmation && (
                    <DeleteConfirmationModal
                        onDelete={handleDelete}
                        onCancel={toggleConfirmation}
                    />
                )}
                <div className='vs-body'>
                    <div className='view-student'>
                        <button className='back-btn' onClick={() => navigate(-1)}>
                            <img src={require('../../../../global/asset/back.png')} />
                        </button>
                        <label className='vs-student'>{formData.student_lname}, {formData.student_fname}</label>
                        <div className='vs'>
                            <div className='view-student-detail'>
                                <div className='vs2'>
                                    <label>Last Name:</label>
                                    <input
                                        name='student_lname'
                                        value={formData.student_lname}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>First Name:</label>
                                        <input
                                            name='student_fname'
                                            value={formData.student_fname}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className='vs2'>
                                        <label>Middle Initial:</label>
                                        <input
                                            name='student_mi'
                                            value={formData.student_mi}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className='vs1'>
                                    <div className='vs2'>
                                        <label>Date of Birth:</label>
                                        <input
                                            name='student_dob'
                                            type='date'
                                            value={formData.student_dob.slice(0, 10)}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className='vs2'>
                                        <label>Gender:</label>
                                        <select
                                            name='student_gender'
                                            value={formData.student_gender}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='vs-buttons'>
                                    {isEditing ? (
                                        <>
                                            <button className='vs-edit' onClick={handleSave}>
                                                Save
                                            </button>
                                            <button className='vs-remove' onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='vs-edit' onClick={() => setIsEditing(true)}>
                                                Edit Details <img src={require('../assets/edit.png')} />
                                            </button>
                                            <button className='vs-remove' onClick={toggleConfirmation}>
                                                Remove <img src={require('../assets/remove.png')} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className='view-student-rh'>
                                <label>Reading History:</label>
                                <div className='reading-history'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Book</th>
                                                <th>Status</th>
                                                <th>Last Viewed</th>
                                                <th>Time Elapsed</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Add reading history data here */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
