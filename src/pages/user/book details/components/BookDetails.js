import React from 'react'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import './BookDetails.css'
import { useLocation, useNavigate } from 'react-router-dom';


export default function BookDetails() {

    const navigate = new useNavigate()

    const location = useLocation();
    const selectedBook = location.state;
    console.log(selectedBook)

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
                        <label className='bd-title'>{selectedBook.book.book_title}</label>
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
                                    <select>
                                        <option></option>
                                    </select>
                                    <label>Student</label>
                                    <select>
                                        <option></option>
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
        </div>
    )
}
