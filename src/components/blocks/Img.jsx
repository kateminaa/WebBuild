import React from "react";

const Img = ({ src, x = 0, y = 0, width = 200, height = "auto", zIndex = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex }}>
    <img src={src} alt="" style={{ width, height }} />
  </div>
);

export default Img;
