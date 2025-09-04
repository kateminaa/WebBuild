import React from "react";

const Text = ({ text, x = 0, y = 0, fontSize = 16, color = "#000", zIndex = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontSize,
      color,
      zIndex,
    }}
  >
    {text}
  </div>
);

export default Text;
