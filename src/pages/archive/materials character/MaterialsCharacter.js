import React from 'react'
import "./MaterialsCharacter.css"
import { NavBarIn } from '../home/components/NavBarIn'

export default function MaterialsCharacter() {
    return (
        <>
            <NavBarIn></NavBarIn>
            <div className='character-container'>
                <div className='top-character-subcontainer'>
                    <img className="top-book" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360057900i/906396.jpg" />
                    <div className='top-right'>
                        <h1>Louise Braille</h1>
                        <p>Grade 2 - Braille Materials</p>
                    </div>
                </div>

                <div className='mid-character-subcontainer'>



                </div>
                <div className='bot-character-subcontainer'>
                    <button className='materials-back-btn'>Return</button>
                </div>
            </div>
        </>
    )
}
