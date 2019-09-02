import React, { Component } from "react";
import ReactiveElements from "reactive-elements";
import _ from "lodash";

import Header from "./header";
import Filters from "./filters";
import ListSliders from "./../../common/sliders/listSliders";
import Spinner from "./../../common/spinner";

import { getAllLocations } from "./../../../services/locationService";
import { getAllTerms } from "./../../../services/generalService";

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid: true,
      activeTab: "1",
      filters: {
        area: [],
        category: [],
        style: [],
        feature: [],
        permit: []
      },
      locations: [],
      termsLoading: true,
      locLoading: true,
      showAllLocs: true
    };

    console.log("Props are: ", this.props);

    console.log("Search Filter Term:  ", this.props.searchFilter);
    console.log("Search Filter Taxonomy:  ", this.props.searchTaxonomy);
  }

  async componentDidMount() {
    //Getting Terms fro
    // Getting all terms
    this.getTerms();

    const { data } = await getAllLocations();
    if (!data) {
      console.log("Something went wrong while getting all locations");
      return;
    }

    data.map(item => (item.filtered = true));

    this.setState({
      locLoading: false,
      locations: data
    });

    //Filtering If filter is passed:

    this.applySearchFilters();
  }

  async getTerms() {
    const { data } = await getAllTerms();

    const area = _(data)
      .filter(a => a.taxonomy === "loc_area")
      .value();

    const style = _(data)
      .filter(s => s.taxonomy === "loc_style")
      .value();

    const feature = _(data)
      .filter(f => f.taxonomy === "loc_feature")
      .value();

    const category = _(data)
      .filter(c => c.taxonomy === "loc_cat")
      .value();

    const permit = _(data)
      .filter(c => c.taxonomy === "loc_permit")
      .value();

    this.setState({
      termsLoading: false,
      filters: {
        area,
        category,
        style,
        feature,
        permit
      }
    });
  }

  applySearchFilters() {
    console.log("-- APPLY SEARCH FILTER--");

    const { searchFilter, searchTaxonomy } = this.props;

    if (!_.isEmpty(searchFilter) && !_.isEmpty(searchTaxonomy)) {
      console.log(
        "Search Filters are definded: ",
        searchFilter,
        searchTaxonomy
      );

      switch (searchTaxonomy) {
        case "loc-area": {
          const { area } = this.state.filters;

          const index = _.findIndex(area, { slug: searchFilter });
          console.log("Area: ", index);
          this.onCategoryBtnClick("area", index);
          break;
        }
        case "loc-style": {
          const { style } = this.state.filters;

          const index = _.findIndex(style, { slug: searchFilter });
          console.log("Style: ", index);
          this.onCategoryBtnClick("style", index);
          break;
        }
        case "loc-cat": {
          const { category } = this.state.filters;

          const index = _.findIndex(category, { slug: searchFilter });
          console.log("Category: ", index);
          this.onCategoryBtnClick("category", index);
          break;
        }
        case "loc-feature": {
          const { feature } = this.state.filters;

          const index = _.findIndex(feature, { slug: searchFilter });
          console.log("feature: ", index);
          this.onCategoryBtnClick("feature", index);
          break;
        }
        case "loc-permit": {
          const { permit } = this.state.filters;

          const index = _.findIndex(permit, { slug: searchFilter });
          console.log("permit: ", index);
          this.onCategoryBtnClick("permit", index);
          break;
        }
        default: {
          console.log("INVALID TAXONOMY");
          break;
        }
      }
    } else {
      console.log("Search Filters are NOT defined");
    }

    console.log("Filtering FUNCTION FROM APPLYSEARCHFITLERS ");

    //this.filterLocations();
  }

  filterLocations() {
    console.log("FilterLocations is called");
    const { area, category, style, feature, permit } = this.state.filters;
    const { locations } = this.state;

    let selectedTerms = [];

    area.map(term => {
      if (term.isActive) selectedTerms.push(term);
    });
    category.map(term => {
      if (term.isActive) selectedTerms.push(term);
    });
    style.map(term => {
      if (term.isActive) selectedTerms.push(term);
    });
    feature.map(term => {
      if (term.isActive) selectedTerms.push(term);
    });
    permit.map(term => {
      if (term.isActive) selectedTerms.push(term);
    });

    let selectedTermSlugs = [];
    _(selectedTerms)
      .map(term => {
        selectedTermSlugs.push(term.slug);
      })
      .value();

    console.log("Selected Terms Slugs: ", selectedTermSlugs);

    // Filtering all locations

    locations.map(loc => {
      let filtered = true;

      let locationTermSlugs = [];
      _(loc.terms)
        .map(term => {
          locationTermSlugs.push(term.slug);
        })
        .value();

      console.log("Location Terms Slugs: ", locationTermSlugs);

      selectedTermSlugs.map(item => {
        console.log("Inside selecated Terms Slug Item: ", item);
        if (!locationTermSlugs.includes(item)) {
          filtered = false;
        }
      });

      loc.filtered = filtered;
    });

    console.log("SELECTEDTERM Length: ", selectedTermSlugs.length);
    const showAllLocs = selectedTermSlugs.length ? false : true;
    // Setting if
    this.setState({ locations, showAllLocs });
  }

  toggleThumb = btn => {
    console.log("ToggleThumb is called: ", btn);

    const { isGrid } = this.state;

    if (btn != "grid" && isGrid)
      this.setState({
        isGrid: !isGrid
      });
    else if (btn == "grid" && !isGrid)
      this.setState({
        isGrid: !isGrid
      });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onCategoryBtnClick = (type, index) => {
    let { filters } = this.state;
    let filterArray = filters[type];

    if (!filterArray) {
      console.log("Something wrong with button click");
      return;
    }

    filterArray[index].isActive = !filterArray[index].isActive;
    this.setState({
      filters: { ...filters, type: filterArray }
    });

    this.filterLocations();
  };

  render() {
    const {
      isGrid,
      filters,
      activeTab,
      locations,
      termsLoading,
      locLoading,
      showAllLocs
    } = this.state;

    const filteredLocsCount = _.filter(locations, loc => loc.filtered == true)
      .length;

    console.log("----- Filtered Location Count: ", filteredLocsCount);
    return (
      <div className="ms-browse-list" style={{ minHeight: 500 }}>
        <Header
          isGrid={isGrid}
          filters={filters}
          toggleThumb={this.toggleThumb}
          onCategoryBtnClick={this.onCategoryBtnClick}
          showAllLocs={showAllLocs}
        />
        {termsLoading && <Spinner />}
        {!termsLoading && (
          <Filters
            toggleTab={this.toggleTab}
            filters={filters}
            activeTab={activeTab}
            onCategoryBtnClick={this.onCategoryBtnClick}
            showAllLocs={showAllLocs}
          />
        )}

        {locLoading && <Spinner />}

        {!locLoading && (
          <ListSliders list={locations} filteredLocsCount={filteredLocsCount} />
        )}
      </div>
    );
  }
}

ReactiveElements.registerReact("ms-browse-locations", Browse);

export default Browse;
