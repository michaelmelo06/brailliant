import React from 'react'

export default function AdminSideNavigation() {
    return (
        <div className='sidenav-container'>
            <img className='sidenav-logo' src={require('../../asset/Brailliant-Logo.png')} /><br />
            <label>MENU</label>
            <a href='/admin/home'><img src={require('../../asset/Home.png')} />  Home</a>
            <a href='/admin/library'><img src={require('../../asset/off.png')} />  Manage Library</a>
            <a href='/admin/accounts'><img src={require('../../asset/Users.png')} />  Manage Accounts</a>
            <a href='/admin/content-request'><img src={require('../../asset/Type.png')}  />  Content Requests</a>
            {/*<a href='/admin/profile'><img src={require('../../asset/User.png')}  />  Profile</a>*/}
        </div>
    )
}
