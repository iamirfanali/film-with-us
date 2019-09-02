import React from "react";
const Category = ({ data }) => {
  const { name, acf_image: img, count, slug } = data;

  return (
    <div className="card mb-4 shadow-sm">
      <a href={`/loc_cat/${slug}`} className="text-dark">
        <img
          src={img ? img.sizes.medium : ""}
          className="img-fluid img-rounded ms-slider-image"
          alt={name}
        />
        <div className="card-body">
          <p className="card-text">
            <span className="font-weight-bold ms-loc-list-cat-title">
              {name}
            </span>
            <span className="font-weight-bold float-right p0">
              {count} Locations
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default Category;
