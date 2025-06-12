import React, { useState, useEffect } from 'react';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import './BookDetails.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function BookDetails() {

    const navigate = new useNavigate()

    const location = useLocation();
    const selectedBook = location.state;

    const [students, setStudents] = useState([])
    const [sections, setSections] = useState([])
    const [selectedSection, setSelectedSection] = useState('')


    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }


    useEffect(() => {
        axios.get('http://localhost:8000/api/allsections')
            .then((response) => {
                console.log(response.data)
                setSections(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        axios.get('http://localhost:8000/api/allstudents')
            .then((response) => {
                console.log(response.data)
                setStudents(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        //setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    return (
        <div className='container'>


            <div>
                <SideNavigation />
            </div>
            <div className='bd-container'>
                <div className='bd-header'>
                    <Header />
                </div>
                <div className='bd-body'>
                    <div className='book-details'>
                        <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button><label className='bd-title'>{selectedBook.book.book_title}</label>
                        <div className='bd-details'>
                            <div className='bd-left'>
                                <img
                                    className='bd-cover'
                                    src={require(`../../../../images/${selectedBook.book.book_img}`)}
                                />
                                <div className='bd-info'>
                                    <label>Title: {selectedBook.book.book_title}</label>
                                    <label>Author: {selectedBook.book.book_author}</label>
                                    <label>Description: {selectedBook.book.book_description}</label>
                                </div>
                            </div>
                            <div className='bd-right'>
                                <label className='class-list'>Class List</label>
                                <div className='bd-class-list'>
                                    <label>Section:</label>

                                    <select
                                        value={selectedSection.student_section}
                                        onChange={(e) => setSelectedSection(e.target.value)}
                                    >
                                        <option value="">Select Section</option>
                                        {sections.sections?.map((section) => (
                                            <option key={section._id} value={section._id}>
                                                {section.section_level} {section.section_name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Student</label>

                                    <select>
                                        {selectedSection !== '' &&
                                            students.students
                                                ?.filter((student) => student.student_section === selectedSection)
                                                .map((student) => (
                                                    <option key={student._id} value={student._id}>
                                                        {student.student_fname} {student.student_lname}
                                                    </option>
                                                ))}
                                    </select>



                                    <label>History:</label>
                                    <div className='bd-history'>
                                        <p>Last viewed:</p>

                                    </div>
                                </div>
                                <button
                                    className='bd-start-session'
                                    onClick={() => { navigate('/book/session', { state: { book: selectedBook } }) }}
                                ><img src={require('../assets/session.png')} />START SESSION</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
