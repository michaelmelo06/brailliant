import React, { useState, useEffect } from 'react';
import './Home.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DashboardHeader from '../../../../global/components/user/DashboardHeader'
import axios from 'axios'


export default function Home() {
    
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='home-container'>
                <div className='home-header'>
                    <DashboardHeader />
                </div>
                <div className='home-body'>
                    <div className='home-braille-char'>
                        <label className='braillechar'>Braille Characters</label>
                        <div className='home-braille-1'>
                            <div className='home-modules'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 2.png')} />
                            </div>
                            <div className='home-text'>
                                <label className='t1'>Grade 1 Braille</label>
                                <label className='t2'>Margaret Davidson</label>
                                <label className='t3'>Grade 1 - Braille Material</label>
                            </div>
                        </div>
                        <div className='home-braille-2'>
                            <div className='home-modules'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 3.png')} />
                            </div>
                            <div className='home-text'>
                                <label className='t1'>Grade 2 Braille</label>
                                <label className='t2'>Margaret Davidson</label>
                                <label className='t3'>Grade 2 - Braille Material</label>
                            </div>
                        </div>
                    </div>
                    <div className='home-braille-books'>
                        <img src={require('../assets/Group 7.png')} />
                    </div>
                </div>
            </div>
        </div>
    )
}
