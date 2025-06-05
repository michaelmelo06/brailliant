import React, { useEffect, useState } from "react";
import BrailleLetter from "./index";
import convertTextToBrailleDots from "../trylang/api/translate"; 

export default function App() {
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
    handleSubmit({ preventDefault: () => {} });
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
        }
      `}</style>

      <main className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text" className="label">
            Text to translate
          </label>
          <div className="form-row">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              id="text"
              name="text"
              className="input"
            />
            <button type="submit" className="button">
              Translate
            </button>
          </div>
        </form>
        <div id="canvas" className="braille-canvas">
          {brailleDots.split(" ").map((word, index) => (
            <BrailleLetter key={index} dots={word} />
          ))}
        </div>
      </main>
    </>
  );
}
