import React from 'react'
import './SideNavigation.css'

export default function SideNavigation() {
  return (
    <div className='sidenav-container'>
      <img className='sidenav-logo' src={require('../../asset/Brailliant-Logo.png')} /><br />
      <label>MENU</label>
      <a href='/home'><img src={require('../../asset/Home.png')} />  Home</a>
      <a href='/library'><img src={require('../../asset/off.png')} />  Library</a>
      <a href='/class'><img src={require('../../asset/Users.png')} />  Class Settings</a>
      <a href='/text-to-braille'><img src={require('../../asset/Type.png')} />  Text-to-Braille</a>
      <a href='/analytics'><img src={require('../../asset/Bar chart-2.png')} />  Analytics</a>
      <hr />
      <a href='/profile'><img src={require('../../asset/User.png')} />  Profile</a>
      <hr />
      <label>Device: --</label>
      <a href='/device-settings'><img src={require('../../asset/Settings.png')} />  Device Settings</a>
    </div>
  )
}
