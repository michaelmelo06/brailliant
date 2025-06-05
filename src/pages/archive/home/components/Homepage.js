import { NavBar } from "./NavBar";
import './Homepage.css'

import React, { useState, useEffect } from "react";
import axios from 'axios'



const Homepage = () => {

  const [users, setUsers] = useState([])
  

  useEffect(() => {
    axios.get('http://localhost:8000/api/allusers')
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch((error) => {
        console.log("eto ang error mo " + error)
      })
  }, [])

  
  return (
    <div className="homepage-container">
      <NavBar></NavBar>

      <ul>
        {users.users?.map((user) => (
          <li key={user._id}>{user.user_email}</li>
        ))}
      </ul>
      



      <section className="hero">
        <img className="hero-img" src={require('../assets/hero.jpg')} />

        <h1>Refreshable Braille Displays</h1>
        <p>
          Experience a revolutionary approach to education with Brailliant, the app that transforms
          learning for visually impaired students. With our affordable, portable, and innovative
          Refreshable Braille Display (RBD), Brailliant seamlessly integrates with both mobile and
          web platforms.
        </p>
      </section>

      <section className="product-info">
        <div className="device-placeholder">
          <img className="product-img" src={require('../assets/rbd.png')} />
        </div>
        <p>
          Experience a revolutionary approach to education with Brailliant, the app that transforms
          learning for visually impaired students. With our affordable, portable, and innovative
          Refreshable Braille Display (RBD), Brailliant seamlessly integrates with both mobile and
          web platforms.
        </p>
      </section>

      <section className="features">
        <h2>Accessibility Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Text-to-Braille</h3>
            <p>
              Provides real-time translation from text to Braille, allowing visually impaired
              students to access written materials in Braille format.
            </p>
          </div>
          <div className="feature">
            <h3>Synchronization</h3>
            <p>
              Ensures real-time synchronization of content from the web to our Refreshable Braille
              Displays (RBDs), keeping materials up-to-date and accessible.
            </p>
          </div>
          <div className="feature">
            <h3>Analytics</h3>
            <p>
              Displays analytics for books and modules, enabling teachers to track student progress
              and adjust instructional strategies accordingly.
            </p>
          </div>
          <div className="feature">
            <h3>Collaborative Educational Tool</h3>
            <p>
              Complements traditional teaching methods and promotes digital inclusion by enabling
              visually impaired students to independently engage with educational content.
            </p>
          </div>
        </div>
      </section>
    </div>

  )
}
export default Homepage;