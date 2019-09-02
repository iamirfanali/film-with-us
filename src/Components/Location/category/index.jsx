import React, { Component } from "react";
import _ from "lodash";
import ReactiveElements from "reactive-elements";
import Header from "./header";
import "./index.css";
import Spinner from "./../../common/spinner";

import ListSliders from "./../../common/sliders/listSliders";
import {
  getCategoryLocation,
  getCategories
} from "./../../../services/categoryService";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.slug || "",
      category: {},
      catLocs: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { slug } = this.state;
    console.log("Slug is: ", slug);
    if (!slug) {
      console.log("Slug is not defined");
      return;
    }

    // Category Data
    const { data: catData } = await getCategories();

    if (catData) {
      const currentCat = _(catData)
        .filter(c => c.slug === slug)
        .value();

      console.log("Current Category: ", currentCat);
      this.setState({ category: currentCat[0] });
    } else {
      console.log("Something went wrong while getting data");
      return;
    }

    // List Locations from category

    const { data: locData } = await getCategoryLocation(slug);

    locData.map(loc => (loc.filtered = true));
    this.setState({ loading: false, catLocs: locData });
  }

  render() {
    const { name, acf_image: coverImage } = this.state.category || {};
    const { catLocs, loading } = this.state;
    return (
      <div className="ms-location-category" style={{ minHeight: 500 }}>
        {loading && <Spinner />}
        {!loading && <Header name={name} coverImage={coverImage} />}
        {!loading && <ListSliders list={catLocs} />}
      </div>
    );
  }
}

ReactiveElements.registerReact("ms-location-category", Category);

export default Category;
