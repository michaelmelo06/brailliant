import React from "react";
import './index.css';

function BrailleLetter(props) {
  const dots = props.dots.split("");

  const squareStyle = (index) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: dots[index] === "1" ? "#000" : "#fff",
    border: dots[index] === "1" ? "none" : "1px solid #000",
    textAlign: "center",
    fontSize: "8px",
    lineHeight: "12px",
    color: "transparent"
  });

  return (
    <>


      <div className="braille-letter">
        <div className="braille-col">
          <div style={squareStyle(0)}>1</div>
          <div style={squareStyle(1)}>2</div>
          <div style={squareStyle(2)}>3</div>
        </div>
        <div className="braille-col">
          <div style={squareStyle(3)}>4</div>
          <div style={squareStyle(4)}>5</div>
          <div style={squareStyle(5)}>6</div>
        </div>
      </div>
    </>
  );
}

export default BrailleLetter;
