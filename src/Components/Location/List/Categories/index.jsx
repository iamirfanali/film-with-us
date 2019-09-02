import React, { Component } from "react";
import ReactiveElements from "reactive-elements";
import Slider from "react-slick";
import Category from "./category";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import Spinner from "./../../../common/spinner";

import {
  getCategories,
  getSelectedCategories
} from "./../../../../services/categoryService";

const LeftArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={`btn btn-primary`}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "35%",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.7)",
        border: "none"
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
        top: "35%",
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.7)",
        border: "none"
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
  speed: 500,
  lazyLoad: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 1266,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const RenderBrowseButtons = () => {
  return (
    <div className="col-12 text-center">
      <a
        className="ms-loc-cat-btn btn btn-primary m-2"
        role="button"
        href="/browse"
      >
        Browse All Locations
      </a>
      <a
        className="ms-loc-cat-btn btn btn-primary m-2 "
        role="button"
        href="/location-categories"
      >
        All Categories
      </a>
    </div>
  );
};

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { data: allCat } = await getCategories();
    const { data: selectedCat } = await getSelectedCategories();

    console.log("All categories: ", allCat);
    const filteredCat = allCat.filter(cat => {
      return selectedCat.includes(cat.slug);
    });

    this.setState({
      loading: false,
      categories: filteredCat
    });
  }

  renderResponsiveSlider() {
    const { categories } = this.state;
    return (
      <div
        id="ms-loc-categories-slider"
        className="container-fluid ms-loc-slider"
      >
        <div className="row">
          <div className="col-12 px-5 py-3">
            <Slider {...SLIDER_SETTINGS}>
              {categories &&
                categories.map((img, index) => (
                  <Category key={img.term_taxonomy_id} data={img} />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="ms-list-categories">
        <div className="container-fluid">
          <div className="row">
            {loading && <Spinner />}
            {!loading && this.renderResponsiveSlider()}
            {!loading && <RenderBrowseButtons />}
          </div>
        </div>
      </div>
    );
  }
}

ReactiveElements.registerReact("ms-location-list-categories", Categories);
export default Categories;
