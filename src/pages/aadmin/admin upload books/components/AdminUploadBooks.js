import React, { useState, useEffect } from 'react'
import './AdminUploadBooks.css'
import axios from 'axios'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'


export default function AdminUploadBooks() {
    const [newBook, setNewBook] = useState({
        book_title: '',
        book_author: '',
        book_genre: '',
        book_date_published: '',
        book_level: '',
        book_description: '',
        book_img: '',
        book_file: '',
    });


    const [file, setFile] = useState('')
    const [allImage, setAllImage] = useState(null)
    const [user, setUser] = useState([])
    const title = "Upload Books"

    const clearForm = () => {
        setNewBook({
            book_title: '',
            book_author: '',
            book_genre: '',
            book_date_published: '',
            book_level: '',
            book_description: '',
            book_img: '',
            book_file: '',
        });
    };

    const handleUploadBook = async () => {
        try {

            const updatedBook = {
                ...newBook,
                book_last_modified: new Date(),
            };

            const response = await axios.post('http://localhost:8000/api/newbook', updatedBook);
            const createdBook = response.data.book;

            console.log("Book created:", createdBook);
            alert("Book created successfully!");

            if (file) {
                await submitImage(createdBook._id);
                await submitimage(createdBook._id);
            }


            clearForm();


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
        const result = await axios.get("http://localhost:8000/get-files")
        console.log(result.data.data)
        setAllImage(result.data.data)
    }

    const submitImage = async (bookId) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await axios.put(`http://localhost:8000/upload-files/${bookId}`,
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
            `http://localhost:8000/upload-image/${bookId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )

    }

    const onInputChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const [allImages, setAllImages] = useState(null)


    const getImage = async (e) => {
        const result = await axios.get("http://localhost:8000/get-image")
        console.log(result)
        setAllImages(result.data.data)
    }


    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='upload-container'>
                <div className='upload-header'>
                    <AdminHeader title={title} />
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
                            <button><img src={require('../assets/white upload.png')} /> Upload Book Cover</button>



                            <div className='lower-left-container'>

                                <label for="file-upload" class="custom-file-upload">
                                    <img src={require('../assets/file.png')} /> Attach file here
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
                                value={newBook.book_title}
                                onChange={(e) => setNewBook({ ...newBook, book_title: e.target.value })}
                            />
                            <p>Author</p>
                            <input
                                required
                                type='text'
                                placeholder='Enter author name here'
                                value={newBook.book_author}
                                onChange={(e) => setNewBook({ ...newBook, book_author: e.target.value })}
                            />
                            <p>Genre</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter genre here'
                                value={newBook.book_genre}
                                onChange={(e) => setNewBook({ ...newBook, book_genre: e.target.value })}
                            />
                            <p>Level</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter book level here'
                                value={newBook.book_level}
                                onChange={(e) => setNewBook({ ...newBook, book_level: e.target.value })}
                            />
                            <p>Description</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter book level here'
                                value={newBook.book_description}
                                onChange={(e) => setNewBook({ ...newBook, book_description: e.target.value })}
                            />
                            <p>Date Published</p>
                            <input
                                required
                                type='date'
                                placeholder='MM/DD/YYYY'
                                value={newBook.book_date_published}
                                onChange={(e) => setNewBook({ ...newBook, book_date_published: e.target.value })}
                            />
                            <button type='submit'><img src={require('../assets/upload.png')} /> Upload Book</button>
                        </div>
                    </form>








                </div>
            </div>
        </div>
    )
}
