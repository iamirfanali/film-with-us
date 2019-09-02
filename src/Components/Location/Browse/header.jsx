import React from "react";
import { Badge } from "reactstrap";
import "./index.css";

const RenderOptions = ({ isGrid, toggleThumb }) => {
  const btnClasses = "btn btn-sm pr-5 btn-primary";

  return (
    <React.Fragment>
      <p className="lead pb-0 mb-2">View Options</p>
      <p className="py-0 my-0">Thumbnail Size</p>
      <div className="btn-group" role="group" aria-label="">
        <button
          onClick={() => toggleThumb("grid")}
          className={`${btnClasses} ${isGrid ? "btn-dark" : ""}`}
        >
          <i className="fa fa-columns">&nbsp;</i>
          Grid
        </button>
        <button
          onClick={() => toggleThumb("full")}
          className={`${btnClasses} ${!isGrid ? "btn-dark" : ""}`}
        >
          <i className="fa fa-align-justify">&nbsp;</i>
          Full
        </button>
      </div>
    </React.Fragment>
  );
};

const RenderTags = ({ filters, onCategoryBtnClick, showAllLocs }) => {
  // console.log("Render Filter props are", filters);

  if (showAllLocs)
    return <p className="ms-browse-loc-tag">Showing all locations.</p>;

  const { area, category, feature, style, permit } = filters;
  area.map(x => (x.type = "area"));
  category.map(x => (x.type = "category"));
  feature.map(x => (x.type = "feature"));
  style.map(x => (x.type = "style"));
  permit.map(x => (x.type = "permit"));

  const RenderCategories = ({ data }) =>
    data.map(
      (tag, index) =>
        tag.isActive && (
          <Badge
            className="mb-1 ms-cursor ms-loc-tag"
            key={index}
            color="light"
            pill
          >
            {tag.name}
            <a
              className="btn btn-sm p-0 pl-2 mb-1 btn-light ms-loc-tag"
              onClick={() => onCategoryBtnClick(tag.type, index)}
            >
              <i className="fa fa-remove">&nbsp;</i>
            </a>
          </Badge>
        )
    );

  return (
    <React.Fragment>
      <RenderCategories data={area} />
      <RenderCategories data={category} />
      <RenderCategories data={feature} />
      <RenderCategories data={style} />
      <RenderCategories data={permit} />
    </React.Fragment>
  );
};

const Header = ({
  isGrid,
  filters,
  toggleThumb,
  onCategoryBtnClick,
  showAllLocs
}) => {
  return (
    <section className="page-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 my-sm-4">
            <h1 className="py-2">Browse Locations</h1>

            <RenderTags
              filters={filters}
              onCategoryBtnClick={onCategoryBtnClick}
              showAllLocs={showAllLocs}
            />
          </div>
          <div className="col-sm-6 my-sm-4 border-left">
            <p>
              <strong>Quick Tips:</strong>
            </p>
            <ul className="ms-browse-quick-tips">
              <li>
                Find your desired locations using filters like:
                <strong>Area, Category, Style, Features and Permits.</strong>
              </li>
              <li>
                Utilize arrow icons to see all images in the particular
                location.
              </li>
              <li>
                Click on location below to open up a property page and add
                images to your Saved Locations.
              </li>
              <li>
                In the Saved Locations tab, you will be able to generate a pdf
                with a copy of your saved properties.
              </li>
            </ul>
            {/* <RenderOptions isGrid={isGrid} toggleThumb={toggleThumb} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
