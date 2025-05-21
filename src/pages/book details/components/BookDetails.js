import React, { useState } from "react";
import { NavBarIn } from '../../home/components/NavBarIn'
import './BookDetails.css'
import './EndSessionModal.css'
import { Link } from "react-router-dom";

export default function BookDetails() {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add('active-modal')
  }
  else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <NavBarIn></NavBarIn>
      <div className="bookdetails-container">
        <div className='bookdetails-top-subcontainer'>

          <img className="top-book" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360057900i/906396.jpg" />
          <div className='top-right'>
            <h1>Louise Braille</h1>
            <p>Grade 2 - Braille Materials</p>
          </div>
        </div>

        <div className='bookdetails-mid-subcontainer'>
          <div className='mid-left'>
            <h1>Chapter 1</h1>
            <textarea className="chapter"></textarea>
          </div>
          <div className='mid-right'>
            <h1>Preview</h1>
            <textarea className="preview"></textarea>
            <p>Text highlighted are translated to braille</p>
          </div>



        </div>
        <div className='bookdetails-bot-subcontainer'>
          <h1>Book Details</h1>
          <div className="details">
            <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360057900i/906396.jpg" className='bot-img' />

            <div className='bot-left'>
              <h1>Louise Braille</h1>
              <p>Author: Margaret Davidson</p>
              <p>Genre: Braille Material</p>
              <p>Date Published: June 1, 1991</p>
            </div>

            <div className='bot-right'>
              <button className="sync-btn" >Sync</button><br />
              <button className="endsession-btn" onClick={toggleModal}>End Session</button>
            </div>
          </div>
        </div>


      </div>

      {modal && (
        <div className='endsession-modal'>
          <div className='endsession-overlay' onClick={toggleModal} ></div>
          <div className='endsession-modal-content'>


            <div className="modal-top">
              <h1>Session Summary</h1>
              <h3>Louise Braille</h3>
            </div>


            <div className="modal-mid">
              <img className="modal-img" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360057900i/906396.jpg" />
              <p>Progress: Chapter 1</p>
              <p>Level: Grade 1 Braille</p>
              <p>Page: 1 to 5</p>
            </div>


            <div className="modal-bot">
              <Link to={'/bd'}><button className='save-btn'>Save Record</button></Link>
            </div>



          </div>

        </div>

      )}
    </>
  )
}
