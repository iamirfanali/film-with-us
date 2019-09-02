import React from "react";
const Category = ({ data }) => {
  const { name, acf_image: img, count, slug } = data;
  return (
    <div className="col-sm-4 col-md-3">
      <div className="card mb-4 shadow-sm">
        <a href={`/loc_cat/${slug}`} className="text-dark">
          <img
            src={img ? img.url : ""}
            className="img-fluid img-rounded ms-all-categories-img"
            alt={name}
          />
          <div className="card-body">
            <p className="card-text">
              {name}
              <span className="font-weight-bold float-right p0">
                {count} Loc
              </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Category;
