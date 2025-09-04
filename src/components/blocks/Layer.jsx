import React from "react";

const Layer = ({ width, height, opacity, backgroundColor, x = 0, y = 0, zIndex = 0 }) => (
  <div
    style={{
      width: width ?? 1920,
      height: height ?? 1080,
      opacity: opacity ?? 1,
      backgroundColor: backgroundColor ?? "lightgray",
      position: "absolute",
      left: x,
      top: y,
      zIndex,
    }}
  />
);

export default Layer;
