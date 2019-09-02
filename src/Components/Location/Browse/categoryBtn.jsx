import { PropTypes } from "prop-types";
import React from "react";
const CategoryBtn = ({ name, count, isActive, onClick }) => {
  const btnClasses = `btn btn-block mb-1 ${
    isActive ? "btn-dark" : "btn-outline-secondary"
  }`;

  return (
    <button type="button" onClick={() => onClick("key")} className={btnClasses}>
      <span className="float-left">{name}</span>
      <span className="float-right">{count}</span>
    </button>
  );
};

CategoryBtn.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};
export default CategoryBtn;
