import React, { useState, useEffect } from 'react'
import './UploadBooks.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function UploadBooks() {

    const navigate = new useNavigate()

    const [newBook, setNewBook] = useState({
        request_book_title: '',
        request_book_author: '',
        request_book_genre: '',
        request_book_date_published: '',
        request_book_level: '',
        request_book_img: '',
        request_book_file: '',
        request_book_description: '',
        request_by: ''
    });

    const [auditTrail, setAuditTrail] = useState({
        at_action: '',
        at_date: '',
        at_user: '',
    });

    const [file, setFile] = useState('')
    const [allImage, setAllImage] = useState(null)
    const [user, setUser] = useState([])

    const clearForm = () => {
        setNewBook({
            request_book_title: '',
            request_book_author: '',
            request_book_genre: '',
            request_book_date_published: '',
            request_book_level: '',
            request_book_img: '',
            request_book_file: '',
            request_book_description: '',
            request_by: '',
        });
    };

    const handleUploadBook = async () => {
        const updatedData = { user_recent_act: 'Requested Upload Material' };
        axios.put(`http://localhost:8000/api/update/user/${user._id}`, updatedData)
            .then(() => {
                console.log(updatedData, "this after update");
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('this new req', newBook);
        try {
            const updatedBook = {
                ...newBook,
                request_by: user.user_email,
                request_book_status: ''
            };

            const response = await axios.post('http://localhost:8000/api/newrequestbook', updatedBook);
            const createdBook = response.data.book;

            console.log("Book created:", createdBook);
            alert("Book uploaded for request successfully!");
            navigate('/library')
            if (file) {
                await submitImage(createdBook._id);
                await submitimage(createdBook._id);
            }

            clearForm();

            const auditData = {
                at_user: user.user_email,
                at_date: new Date(),
                at_action: 'Requested Upload Material'
            };
            setAuditTrail(auditData);
            console.log(auditData);

            await axios.post('http://localhost:8000/api/newaudittrail', auditData);

        } catch (error) {
            console.error(error);
            alert("Failed to upload book");
        }
    };

    useEffect(() => {
        getFile()
        setUser(JSON.parse(localStorage.getItem('users')))
        getImage()
    }, [])


    const getFile = async () => {
        const result = await axios.get("http://localhost:8000/get-requestfiles")
        console.log(result.data.data)
        setAllImage(result.data.data)
    }

    const submitImage = async (bookId) => {
        console.log('this book id', bookId)
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await axios.put(`http://localhost:8000/upload-requestfiles/${bookId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("File uploaded:", result.data);
        } catch (error) {
            console.error("File upload error:", error);
        }
    };

    const [image, setImage] = useState(null)

    const submitimage = async (bookId) => {

        const formData = new FormData()
        formData.append('image', image)

        const result = await axios.put(
            `http://localhost:8000/upload-requestimage/${bookId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )

    }

    const onInputChange = (e) => {
        console.log('this is png', e.target.files[0])
        setImage(e.target.files[0])
    }

    const [allImages, setAllImages] = useState(null)


    const getImage = async (e) => {
        const result = await axios.get("http://localhost:8000/get-requestimage")
        console.log(result.data.data)
        setAllImages(result.data.data)
    }


    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='upload-container'>
                <div className='upload-header'>
                    <Header />
                </div>
                <div className='upload-body'>
                    <label className='up'>Upload Books</label>


                    <form className="uploadmaterial-container" onSubmit={(e) => {
                        e.preventDefault()
                        handleUploadBook()
                        submitimage()

                    }}>
                        <div className='left-container'>

                            <label for="image-upload" className='upload-image'>
                                Attach Image
                            </label>
                            <input
                                id='image-upload'
                                type='file'
                                accept='image/*'
                                onChange={onInputChange}
                                required
                            /><br />
                            <button>Upload Book Cover</button>



                            <div className='lower-left-container'>

                                <label for="file-upload" class="custom-file-upload">
                                    📄 Attach file here
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept='application/pdf'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}

                                />


                            </div>
                        </div>





                        <div className='right-container'>
                            <p>Title</p>
                            <input
                                required
                                type='text'
                                placeholder='Enter book title here'
                                value={newBook.request_book_title}
                                onChange={(e) => setNewBook({ ...newBook, request_book_title: e.target.value })}
                            />
                            <p>Author</p>
                            <input
                                required
                                type='text'
                                placeholder='Enter author name here'
                                value={newBook.request_book_author}
                                onChange={(e) => setNewBook({ ...newBook, request_book_author: e.target.value })}
                            />
                            <p>Genre</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter genre here'
                                value={newBook.request_book_genre}
                                onChange={(e) => setNewBook({ ...newBook, request_book_genre: e.target.value })}
                            />
                            <p>Description</p>
                            <textarea
                                required
                                type='text'
                                placeholder='Enter description here'
                                value={newBook.request_book_description}
                                onChange={(e) => setNewBook({ ...newBook, request_book_description: e.target.value })}
                            />
                            <p>Level</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter book level here'
                                value={newBook.request_book_level}
                                onChange={(e) => setNewBook({ ...newBook, request_book_level: e.target.value })}
                            />
                            <p>Date Published</p>
                            <input
                                required
                                type='date'
                                placeholder='MM/DD/YYYY'
                                value={newBook.request_book_date_published}
                                onChange={(e) => setNewBook({ ...newBook, request_book_date_published: e.target.value })}
                            />
                            <button type='submit'>Submit Upload Request</button>
                        </div>
                    </form>






                </div>
            </div>
        </div>
    )
}
