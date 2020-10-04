import React from "react";

const ProgressBar = ({ width }) => {
  return (
    <progress id="file" value={width} max="100" style={{ width: "100%" }}>
      {" "}
      32%{" "}
    </progress>
  );
};

export default ProgressBar;
