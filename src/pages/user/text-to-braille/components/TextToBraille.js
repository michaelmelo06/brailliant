import React, { useState, useEffect } from 'react';
import './TextToBraille.css'
import './TextToBrailleHeader.css'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import BrailleLetter from "./index";
import convertTextToBrailleDots from "../components/api/translate";


import SideNavigation from '../../../../global/components/user/SideNavigation'


export default function TextToBraille() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    const [text, setText] = useState("hello");
    const [loading, setLoading] = useState(false);
    const [brailleDots, setBrailleDots] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const result = convertTextToBrailleDots(text);
        setBrailleDots(result);
        setLoading(false);
        console.log('nag click')
    }

    useEffect(() => {
        handleSubmit({ preventDefault: () => { } });
    }, []);

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <>

            <div className='container'>
                <div>
                    <SideNavigation />
                </div>
                <div className='ttb-container'>
                    <div className='ttb-header'>
                        <label>Text-to-Braille</label>
                        <nav onClick={toggleDropdown}>
                            <img className='icon' src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
                            <p>{users.user_fname}</p>
                        </nav>
                    </div>
                    {showDropdown && <DropDownMenu />}


                    <form className='ttb-body' onSubmit={handleSubmit}>
                        <div className='ttb-text'>
                            <label>Text-to-Braille</label>
                            <p>Type and sync in simple Braille sentences with the Brailliant RBD!</p>
                        </div>
                        <div className='ttb-translate'>

                            <textarea
                                placeholder='Input text here'
                                className='custom'
                                value={text}
                                onChange={(e) => {
                                    if (e.target.value.length <= 8) {
                                        setText(e.target.value);
                                    }
                                }}
                                type="text"
                                id="text"
                                name="text"
                            />
                            <div className='ttb-preview'>

                                {brailleDots.split(" ").map((word, index) => (
                                    <BrailleLetter key={index} dots={word} />
                                ))}
                            </div>
                        </div>
                        <label className='char-limit'>{text.length} / 8 characters</label>
                        <button><img src={require('../assets/sync.png')} />Sync Text</button>
                    </form>
                </div>
            </div>
        </>

    )
}
