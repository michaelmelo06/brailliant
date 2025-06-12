import React, { useState, useEffect } from 'react';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import './BookSession.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './TextToBraille.css'
import convertTextToBrailleDots from "../components/api/translate";
import BrailleLetter from "./index";


export default function BookSession() {

    const navigate = useNavigate()

    const location = useLocation();
    const selectedBook = location.state.book.book;
    console.log(selectedBook)

    const [file, setFile] = useState(null)
    const [resultText, setResultText] = useState('')

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    //TTB

    const [text, setText] = useState("hello");
    const [loading, setLoading] = useState(false);
    const [brailleDots, setBrailleDots] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const CHUNK_SIZE = 8;

    const currentChunk = resultText.slice(currentIndex, currentIndex + CHUNK_SIZE);


    ////////////////////

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const result = convertTextToBrailleDots(currentChunk);
        setBrailleDots(result);
        setLoading(false);
    }

    useEffect(() => {
        if (!selectedBook?.book_file) return;

        fetch('http://localhost:8000/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: selectedBook.book_file })
        })
            .then(res => res.text())
            .then(text => {
                const trimmedText = text.trim();
                setResultText(trimmedText);

                const initialChunk = trimmedText.slice(0, 8);
                const result = convertTextToBrailleDots(initialChunk);
                setBrailleDots(result);
            })
            .catch(err => console.error('Error extracting text:', err));
    }, []);

    useEffect(() => {
        const currentChunk = resultText.slice(currentIndex, currentIndex + 8);
        const result = convertTextToBrailleDots(currentChunk);
        setBrailleDots(result);
    }, [currentIndex, resultText]);

    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='bs-container'>
                <div className='bs-header'>
                    <Header />
                </div>
                <div className='bs-body'>
                    <div className='book-session'>
                        <div className='bs-title'>
                            <div>
                                <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>
                                <label>{selectedBook.book_title}</label>

                            </div>

                            <label>Time Elapsed</label>
                        </div>
                        <div className='bs-translate'>
                            <div className='bs-text'>
                                <div className='bs-page'>
                                    <div className='bs-page-button'>
                                        <button
                                            onClick={() => setCurrentIndex(prev => Math.max(prev - CHUNK_SIZE, 0))}
                                            disabled={currentIndex === 0}
                                        >
                                            <img src={require(`../assets/prev.png`)} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentIndex(prev =>
                                                    prev + CHUNK_SIZE < resultText.length ? prev + CHUNK_SIZE : prev
                                                )
                                            }
                                            disabled={currentIndex + CHUNK_SIZE >= resultText.length}

                                        >
                                            <img src={require(`../assets/next.png`)} />
                                        </button>
                                    </div>
                                </div>
                                <div className='highlighted-textarea'>
                                    <span>{resultText.slice(0, currentIndex)}</span>
                                    <span className='highlight'>{resultText.slice(currentIndex, currentIndex + CHUNK_SIZE)}</span>
                                    <span>{resultText.slice(currentIndex + CHUNK_SIZE)}</span>
                                </div>
                            </div>
                            <div className='bs-braille'>
                                <div className='bs-preview'>
                                    <label>Only highlighted chracters are sycned to the display</label>
                                </div>




                                <div className='textarea-braille'>

                                    {brailleDots.split(" ").map((word, index) => (
                                        <BrailleLetter key={index} dots={word} />
                                    ))}

                                </div>




                                <div>
                                    <button className='bs-sync'>SYNC</button>
                                    <button className='bs-end'>END SESSION</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
