import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const LeftArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={`btn btn-primary`}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "40%",
        zIndex: 999,
        border: "none",
        backgroundColor: "rgba(0,0,0,0.7)"
      }}
    >
      <i style={{ fontSize: 20, color: "#fff" }} className="fa fa-arrow-left" />
    </button>
  );
};

const RightArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={`btn btn-primary`}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "40%",
        right: 0,
        zIndex: 999,
        border: "none",
        backgroundColor: "rgba(0,0,0,0.7)"
      }}
    >
      <i
        style={{ fontSize: 20, color: "#fff" }}
        className="fa fa-arrow-right"
      />
    </button>
  );
};

const SLIDER_SETTINGS = {
  dots: false,
  infinite: false,
  lazyLoad: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  adaptiveHeight: false
};

const LocSlider = ({ loc }) => {
  if (!loc) {
    console.log("Location is not definded");
    return null;
  }

  return (
    <div
      id="ms-loc-slider-main"
      className="col-sm-6 col-md-3 ms-loc-slider p-1"
    >
      <Slider {...SLIDER_SETTINGS}>
        {loc.acf.locations_gallery.map((img, index) => (
          <div key={index}>
            <a href={`/locations/${loc.slug}`}>
              <img
                src={img.url}
                className="img-fluid w-100 ms-loc-slider-image"
                alt={img.name}
              />
              <div className="ms-img-data bg-dark p-1">
                <span className="text-light">
                  <strong
                    className="ms-cursor"
                    // onClick={() => console.log("Pull Sheet button is called")}
                  >
                    {loc.title}
                  </strong>
                </span>
                {/* <span className="pull-right text-light">PL5924</span> */}
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LocSlider;
