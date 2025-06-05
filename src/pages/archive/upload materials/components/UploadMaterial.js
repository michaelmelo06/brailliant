import React, { useState, useEffect } from 'react'
import { NavBarIn } from '../../home/components/NavBarIn'
import './UploadMaterials.css'
import axios from 'axios'

export default function UploadMaterial() {

  const [newBook, setNewBook] = useState({
    book_title: '',
    book_author: '',
    book_genre: '',
    book_date_published: '',
    book_level: '',
    book_img: '',
    book_file: '',
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
      book_title: '',
      book_author: '',
      book_genre: '',
      book_date_published: '',
      book_level: '',
      book_img: '',
      book_file: '',
    });
  };

  const handleUploadBook = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/newbook', newBook);
      const createdBook = response.data.book;

      console.log("Book created:", createdBook);
      alert("Book created successfully!");

      // Upload file with the book's ID
      if (file) {
        await submitImage(createdBook._id);
      }

      clearForm();
      setAuditTrail({
        at_user: user.user_email,
        at_date: new Date(),
        at_action: 'Uploaded Material'
      })
      console.log(auditTrail)
      const at = await axios.post('http://localhost:8000/api/newaudittrail', auditTrail);

    } catch (error) {
      console.error(error);
      alert("Failed to upload book");
    }
  };


  useEffect(() => {
    getFile()
    setUser(JSON.parse(localStorage.getItem('users')))
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
  return (
    <>
      <NavBarIn></NavBarIn>
      <form className="uploadmaterial-container" onSubmit={(e) => {
        e.preventDefault()
        handleUploadBook()

      }}>
        <div className='left-container'>
          <img className='image-bd' src={require('../assets/image.png')} /><br />
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
            type='text'
            placeholder='Enter book title here'
            value={newBook.book_title}
            onChange={(e) => setNewBook({ ...newBook, book_title: e.target.value })}
          />
          <p>Author</p>
          <input
            type='text'
            placeholder='Enter author name here'
            value={newBook.book_author}
            onChange={(e) => setNewBook({ ...newBook, book_author: e.target.value })}
          />
          <p>Genre</p>
          <input
            type='text'
            placeholder=' Enter genre here'
            value={newBook.book_genre}
            onChange={(e) => setNewBook({ ...newBook, book_genre: e.target.value })}
          />
          <p>Level</p>
          <input
            type='text'
            placeholder=' Enter book level here'
            value={newBook.book_level}
            onChange={(e) => setNewBook({ ...newBook, book_level: e.target.value })}
          />
          <p>Date Published</p>
          <input
            type='date'
            placeholder='MM/DD/YYYY'
            value={newBook.book_date_published}
            onChange={(e) => setNewBook({ ...newBook, book_date_published: e.target.value })}
          />
          <button type='submit'>Upload</button>
        </div>
      </form>
    </>

  )
}
