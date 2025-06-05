import { NavBarIn } from '../../home/components/NavBarIn';
import './CustomText.css'
import React, { useEffect, useState } from "react";
import BrailleLetter from "./index";
import convertTextToBrailleDots from "../components/api/translate";


export default function CustomText() {

  const [text, setText] = useState("merhaba");
  const [loading, setLoading] = useState(false);
  const [brailleDots, setBrailleDots] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = convertTextToBrailleDots(text);
    setBrailleDots(result);
    setLoading(false);
  }

  useEffect(() => {
    handleSubmit({ preventDefault: () => { } });
  }, []);

  return (
    <>
      <style>{`
        .container {
          padding: 16px;
        }
        .label {
          display: block;
          color: #4a4a4a;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 2px solid #38b2ac;
        }
        @media (min-width: 768px) {
          .form-row {
            flex-direction: row;
            align-items: center;
          }
        }
        .input {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 8px;
          width: 100%;
        }
        .input:focus {
          border-color: #6b7280;
          outline: none;
        }
        .button {
          background-color: #6b7280;
          color: white;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #374151;
        }
        .braille-canvas {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 16px;
          height: auto;
          margin: 0 auto;
          width: 100%
        }
      `}</style>


      <NavBarIn></NavBarIn>
      <form className="customtext-container" onSubmit={handleSubmit}>
        <div className='top-subcontainer'>
          <h1>Custom Text</h1>
          <p>Custom text highlighted in red will reflect on the braille board</p>
        </div>

        <div className='mid-subcontainer'>

          <input

            className='custom'

            placeholder='Hello'


            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            id="text"
            name="text"

          ></input><br />
          {/*
          
          
          <input placeholder='Winter'></input><br/>
          <input placeholder='The Cat'></input><br/>s
          <button> + Add Custom Text</button>
          */}
          <div id="canvas" className="braille-canvas">
            {brailleDots.split(" ").map((word, index) => (
              <BrailleLetter key={index} dots={word} />
            ))}
          </div>
        </div>
        <div className='bot-subcontainer'>
          {/** 
          <button className='nav'> Prev</button>
          <button className='nav'> Next</button>
          */}
          <button className='sync'> Sync</button>
        </div>
      </form>
    </>

  )
}
