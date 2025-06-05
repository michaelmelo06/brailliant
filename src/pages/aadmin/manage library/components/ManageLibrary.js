import React, { useState, useEffect } from 'react';
import './ManageLibrary.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ManageLibrary() {

    const navigate = new useNavigate()
    const title = 'Manage Library'
    const [selectedRowId, setSelectedRowId] = useState(null);


    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allbooks')
            .then((response) => {
                console.log(response.data)
                setAllBooks(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    const handleRemove = () => {
        axios.delete(`http://localhost:8000/api/delete/book/${selectedRowId}`)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-ml-container'>
                <div className='admin-ml-header'>
                    <AdminHeader title={title} />
                </div>
                <div className='admin-ml-body'>
                    <div className='admin-manage-library'>
                        <div className='admin-ml-upload'>
                            <label>All Books</label>
                            <button
                                className='ml-upload-btn'
                                onClick={() => { navigate('/admin/upload-book') }}

                            >
                                <img src={require('../assets/upload.png')} />UPLOAD BOOKS</button>
                        </div>
                        <div className='admin-all-books'>
                            <div className='admin-actions'>
                                {/*<input placeholder='Search books'></input>*/}
                                <div></div>
                                <div className='admin-ml-buttons'>
                                    <button onClick={() => {
                                        if (!selectedRowId) {
                                            alert("Please select a book.");
                                            return;
                                        }
                                        navigate('/admin/view/book', { state: { book: selectedRowId } })


                                    }}>View Details <img src={require('../assets/edit.png')} /></button>
                                    <button onClick={()=>{
                                        if (!selectedRowId) {
                                            alert("Please select a book.");
                                            return;
                                        }
                                        handleRemove()
                                    }}>Remove <img src={require('../assets/delete.png')} /></button>
                                </div>
                            </div>
                            <div className='admin-table-cont'>
                                <table className='admin-ml-table'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Genre</th>
                                            <th>Description</th>
                                            <th>Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBooks.books?.map((book) => (
                                            <tr
                                                key={book._id}
                                                onClick={() => setSelectedRowId(book._id)}
                                                className={selectedRowId === book._id ? "highlighted" : ""}
                                            >
                                                <td>{book.book_title}</td>
                                                <td>{book.book_author}</td>
                                                <td>{book.book_genre}</td>
                                                <td>{book.book_description}</td>
                                                <td>{new Date(book.book_last_modified).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
