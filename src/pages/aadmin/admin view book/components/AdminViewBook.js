import React, { useState, useEffect } from 'react'
import './AdminViewBook.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminViewBook() {
    const title = "View Book Details"

    const navigate = new useNavigate()

    const [resultText, setResultText] = useState('')


    const location = useLocation();
    const selectedBook = location.state.book;

    console.log(selectedBook)

    useEffect(() => {
        if (!selectedBook?.request_book_file) return;

        fetch('http://localhost:8000/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: selectedBook.request_book_file })
        })
            .then(res => res.text())
            .then(text => {
                const trimmedText = text.trim();
                setResultText(trimmedText);

                const initialChunk = trimmedText.slice(0, 8);
            })
            .catch(err => console.error('Error extracting text:', err));
    }, []);

    const handleApprove = async () => {
        axios.put(`http://localhost:8000/api/update/requestbook/${selectedBook._id}`, {
            request_book_status: 'Approved'
        })

        const approvedBook = {
            book_title: selectedBook.request_book_title,
            book_author: selectedBook.request_book_title,
            book_genre: selectedBook.request_book_genre,
            book_date_published: selectedBook.request_book_date_published,
            book_level: selectedBook.request_book_level,
            book_description: selectedBook.request_book_description,
            book_img: selectedBook.request_book_img,
            book_file: selectedBook.request_book_file,
            book_last_modified: new Date(),
        };


        const response = await axios.post('http://localhost:8000/api/newbook', approvedBook);
        navigate('/admin/content-request')

    }

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='bd-container'>
                <div className='bd-header'>
                    <AdminHeader title={title} />
                </div>
                <div className='bd-body'>
                    <div className='book-details'>
                        <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>

                        <label className='bd-title'>{selectedBook.request_book_title}</label>
                        <div className='bd-details'>
                            <div className='bd-left'>
                                <img
                                    className='bd-cover'
                                    src={require(`../../../../images/${selectedBook.request_book_img}`)}
                                />
                                <div className='bd-info'>
                                    <label>Title: {selectedBook.request_book_title}</label>
                                    <label>Author: {selectedBook.request_book_author}</label>
                                    <label>Genre: {selectedBook.request_book_genre}</label>
                                    <label>Description: {selectedBook.request_book_description}</label>
                                    <label>Level: {selectedBook.request_book_level}</label>
                                    <label>Request By: {selectedBook.request_by}</label>
                                </div>

                            </div>
                            <div className='bd-right'>
                                <label className='class-list'>File Preview</label>
                                <div className='highlighted-textarea'>
                                    <span>{resultText}</span>
                                </div>
                            </div>

                        </div>
                        <button className='avb-btn' onClick={handleApprove}>Approve Material</button>


                    </div>

                </div>
            </div>
        </div >
    )
}
