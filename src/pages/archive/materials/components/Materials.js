import React, { useState, useEffect } from "react";
import axios from 'axios'

import { NavBarIn } from '../../home/components/NavBarIn'
import './Materials.css'
import BookDetails from '../../book details/components/BookDetails'
import { Link } from 'react-router-dom'
export default function Materials() {

  const [books, setBooks] = useState([])


  useEffect(() => {
    axios.get('http://localhost:8000/api/allbooks')
      .then((response) => {
        console.log(response.data)
        setBooks(response.data)
      })
      .catch((error) => {
        console.log("eto ang error mo " + error)
      })
  }, [])

  return (
    <>

      <NavBarIn></NavBarIn>
      <div className="materials-container">

        <input placeholder='Search'></input>
        <h1>Braille Materials</h1>
        <div className='braille-card-container'>
          <Link to='/bd'>
            <div className='material' >
              <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>
              <h3>Louis Braille</h3>
              <p>Marget Davison</p>
              <p>Grade 2 - Braille Material</p>
            </div>
          </Link>

          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>Six Dots</h3>
            <p>Jen Bryant</p>
            <p>Grade 2 - Braille Material</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>Working with Braille</h3>
            <p>Jen Bryant</p>
            <p>Grade 2 - Braille Material</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>
            <h3>Educated</h3>
            <p>Tara Westover</p>
            <p>Grade 2 - Braille Material</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>
            <h3>Educated</h3>
            <p>Tara Westover</p>
            <p>Grade 2 - Braille Material</p>
          </div><div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>
            <h3>Educated</h3>
            <p>Tara Westover</p>
            <p>Grade 2 - Braille Material</p>
          </div>

          {books.books?.map((book) => (
            <div className='material'>
              <img src="aw" ></img>

              <h3>{book.book_title}</h3>
              <p>{book.book_author}</p>
              <p>Grade 2 - Braille Material</p>
            </div>
          ))}
          

        </div>
        <h1>Literature</h1>
        <div className='literature-card-container'>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>The Day you Begin</h3>
            <p>Jacqueline Woodson</p>
            <p>Grade 2 - Literature</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>Sometimes I Am Furious</h3>
            <p>Joe Berger</p>
            <p>Grade 2 - Literature</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>Working with Braille</h3>
            <p>Jen Bryant</p>
            <p>Grade 2 - Literature</p>
          </div>
          <div className='material'>
            <img src="https://s3.amazonaws.com/ArchiveImages/SLJ/2016/09/EH160906_SixDots.jpg"></img>

            <h3>Educated</h3>
            <p>Tara Westover</p>
            <p>Grade 2 - Literature</p>
          </div>

          


        </div>
      </div>
    </>
  )
}
