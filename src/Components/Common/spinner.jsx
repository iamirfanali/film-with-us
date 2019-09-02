import React from "react";
const Spinner = () => {
  return (
    <div className="col text-center">
      <div className="spinner-grow text-center" role="status">
        <span className="sr-only text-center">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
