import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactiveElements from "reactive-elements";
import "./index.css";
import {
  getSavedLocs,
  saveLocation,
  removeLocation,
  removeAllLocs
} from "../../utils/saveLocation";
import GeneratePdf from "./../generatePdf";

class SaveLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      savedLocs: [],
      refreshPDF: true,
      loading: true
    };
  }

  componentDidMount() {
    const savedLocs = getSavedLocs() || [];

    this.setState({ loading: false, savedLocs });
  }

  refreshLocations(showDropdown = false) {
    console.log("Refresh Locations is called");

    this.setState({ refreshPDF: false }, () => {
      const savedLocs = getSavedLocs();
      this.setState({ savedLocs, showDropdown });
      this.refreshPDF();
    });
  }

  doSaveLocation() {
    const loc = {
      name: "New Location",
      src:
        "https://www.filmwithus.com/wp-content/uploads/2019/03/Filmwithus-StyledToRock-min-150x150.jpg",
      id: 1
    };

    const savedLocs = saveLocation(loc);
    this.setState({ savedLocs });
  }

  doRemoveLocation = id => {
    console.log("Inside do remove ");
    const { onRemoveLoc } = this.props;

    this.setState({ refreshPDF: false }, () => {
      if (onRemoveLoc) onRemoveLoc(id);

      const savedLocs = removeLocation(id);
      this.setState({ savedLocs });
      this.refreshPDF("After");
    });
  };

  toggleMenu = () => {
    console.log("Save Locaiton Button is clicked");
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  renderEmptySaveLocation() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 border-bottom">
            <h4 className="float-left">
              <a className="editname">
                <i className="fas fa-pen" />
              </a>
              Untitled Pull Sheet
            </h4>
          </div>
        </div>
        <div className="row overflow-auto">
          <div className="col-sm-12">
            <p>
              <b>Pullsheet Is Empty</b>
            </p>
          </div>
          <div className="col-sm-12">
            <p>
              To get started click the Add To Pullsheet button on any photo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  deleteAllLocations = () => {
    const { onRemoveLoc } = this.props;

    this.setState({ refreshPDF: false }, () => {
      if (onRemoveLoc) onRemoveLoc(0, true);
      console.log("Delete All is called");
      removeAllLocs();
      const savedLocs = getSavedLocs();

      this.setState({ savedLocs });
      this.refreshPDF();
    });
  };

  refreshPDF(id = "") {
    console.log("Inside refresh fuction ", id);
    console.log("Current stat is: ", this.state.refreshPDF);
    this.setState({ refreshPDF: !this.state.refreshPDF });
  }

  renderSavedLocations(savedLocs = []) {
    const { refreshPDF } = this.state;
    const locCount = (savedLocs && savedLocs.length) || 0;
    console.log("Loc count", locCount);

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row pt-3">
            <div className="col-sm-12">
              {locCount == 0 && <p>No Image selected</p>}

              {locCount != 0 && refreshPDF && <GeneratePdf />}

              {locCount != 0 && (
                <a
                  onClick={() => this.deleteAllLocations()}
                  className="float-right px-2"
                >
                  <i className="fa fa-trash" /> Delete All
                </a>
              )}
            </div>
          </div>
          <div id="ms-save-loc-images-cont" className="row pt-3">
            {savedLocs &&
              savedLocs.map(img => {
                return (
                  <div className="col-sm-4" key={img.id}>
                    <img
                      className="img-fluid"
                      alt={img.name}
                      id={img.id}
                      src={img.src}
                    />
                    <p className="ms-location-name small">
                      {img.locName}
                      <a
                        onClick={e => this.doRemoveLocation(img.id)}
                        className="ms-cursor float-right"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { showDropdown, savedLocs, loading } = this.state;
    const dropdownClasses = showDropdown ? " show" : "";

    return (
      <div className="ms-save-location">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className={`dropdown ${dropdownClasses}`}>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  onClick={this.toggleMenu}
                >
                  Saved Locations
                </button>

                <div className={`dropdown-menu ${dropdownClasses}`}>
                  <section id="ms-save-loc-cont">
                    {/* {this.renderEmptySaveLocation()} */}
                    {!loading && this.renderSavedLocations(savedLocs)}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<SaveLocation />, document.getElementById("ms-save-location"));
ReactiveElements.registerReact("ms-save-location", SaveLocation);

export default SaveLocation;
