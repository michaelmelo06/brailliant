import React, { useState, useEffect } from 'react'
import './AdminViewReal.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminViewReal() {
    const title = "View Book Details"

    const navigate = new useNavigate()

    const [resultText, setResultText] = useState('')
    const [book, setBook] = useState([])


    const location = useLocation();
    const selectedBook = location.state.book;



    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/book/${selectedBook}`)
            .then((response) => {
                console.log("Full book data:", response.data.book);
                setBook(response.data.book);
            })
            .catch((error) => {
                console.log("Section fetch error: ", error);
            });

    }, [selectedBook]);

    useEffect(() => {
        if (!book?.book_file) return;

        fetch('http://localhost:8000/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: book.book_file })
        })
            .then(res => res.text())
            .then(text => {
                const trimmedText = text.trim();
                setResultText(trimmedText);
            })
            .catch(err => console.error('Error extracting text:', err));
        console.log('wat', book.book_img)
    }, [book]);

    let bookImage;
    try {
        bookImage = require(`../../../../images/${book.book_img}`);
    } catch (err) {
        console.log(err)
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
                        <label className='bd-title'>{book.book_title}</label>
                        <div className='bd-details'>
                            <div className='bd-left'>
                                <img
                                    className='bd-cover'
                                    src={bookImage}
                                />
                                <div className='bd-info'>
                                    <label>Title: {book.book_title}</label>
                                    <label>Author: {book.book_author}</label>
                                    <label>Genre: {book.book_genre}</label>
                                    <label>Description: {book.book_description}</label>
                                    <label>Level: {book.book_level}</label>
                                </div>

                            </div>
                            <div className='bd-right'>
                                <label className='class-list'>File Preview</label>
                                <div className='highlighted-textarea'>
                                    <span>{resultText}</span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
