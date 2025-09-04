import React from "react";

const Button = ({ text = "Button", x = 0, y = 0, zIndex = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex }}>
    <button>{text}</button>
  </div>
);

export default Button;
