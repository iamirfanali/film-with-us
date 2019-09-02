import React from "react";
import { getTerms } from "../../utils/filterTerms";

const Header = ({ location = {} }) => {
  const { title, terms } = location;
  const { city, zip_code: zipcode } = location.acf || {};
  const { large: imgUrl } = location.media || {};

  const areas = getTerms(terms, "loc_area");
  const styles = getTerms(terms, "loc_style");
  const features = getTerms(terms, "loc_feature");
  const categories = getTerms(terms, "loc_cat");
  const permits = getTerms(terms, "loc_permit");

  const renderTerms = type => {
    const array = eval(type);
    const arrLength = array.length;

    return array.map((item, i) => {
      if (arrLength === i + 1) return item.name;
      else return `${item.name}, `;
    });
  };

  return (
    <React.Fragment>
      <section id="ms-loc-hero-image">
        <div
          className="container-fluid ms-img-cont"
          style={{
            backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imgUrl}`
          }}
        />
      </section>
      <section id="ms-loc-info-cont">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <h4>
                <b>{title}</b>
              </h4>
              <div className="locationinfo">
                City: <b>{city}</b>
                <br />
                Zip: <b>{zipcode}</b>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <div className="Area">
                <h4>Area</h4>
                <p> {renderTerms("areas")}</p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <div className="Style">
                <h4>Style</h4>
                <p>{renderTerms("styles")}</p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <div className="Feature">
                <h4>Feature</h4>
                <p>{renderTerms("features")}</p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <div className="Category">
                <h4>Category</h4>
                <p>{renderTerms("categories")}</p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-2 border-right border-sm-none text-center text-sm-left">
              <div className="Permit-Type">
                <h4>Permit</h4>
                <p>{renderTerms("permits")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Header;
