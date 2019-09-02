import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import List from "./components/location/list";
import Browse from "./components/location/browse";
import Location from "./components/location";
import Category from "./components/location/category";
import Categories from "./components/location/list/categories";
import SaveLocation from "./components/saveLocation/index";
import GeneratePdf from "./components/generatePdf";
import AllCategories from "./components/location/pages/all-categories";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <List />
        <Category />
        <Browse />
        <Location />
        <Categories />
        <AllCategories />
        <SaveLocation />
        <GeneratePdf />
      </React.Fragment>
    );
  }
}

export default App;
