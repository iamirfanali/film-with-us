import React, { Component } from "react";
import ReactiveElements from "reactive-elements";
import { getCategories } from "./../../../../services/categoryService";
import Category from "./category";
import "./index.css";
import Spinner from "./../../../common/spinner";

class AllCategories extends Component {
  constructor(props) {
    super();
    this.state = {
      categories: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { data } = await getCategories();
    this.setState({
      categories: data,
      loading: false
    });
  }

  render() {
    const { categories, loading } = this.state;

    return (
      <div className="ms-location-all-categories" style={{ minHeight: 500 }}>
        <div className="container-fluid">
          <div className="row">
            {loading && <Spinner />}
            {!loading &&
              categories &&
              categories.map((cat, index) => (
                <Category key={index} data={cat} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactiveElements.registerReact(
  "ms-location-all-categories-page",
  AllCategories
);

export default AllCategories;
