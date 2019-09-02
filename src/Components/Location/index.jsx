import React, { Component } from "react";
import ReactiveElements from "reactive-elements";
import _ from "lodash";
import Header from "./header";
import "./index.css";
import { getLocation } from "../../services/locationService";

import Gallery from "./gallery";
import Spinner from "./../common/spinner";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      location: {},
      reloadLocations: 1,
      loading: true,
      imagesLoaded: false
    };
  }

  async componentDidMount() {
    const { slug } = this.props;

    try {
      const { data: location } = await getLocation(slug);

      const { locations_gallery: gallery } = location.acf || {};

      const photos = [];
      gallery &&
        gallery.map(item => {
          const photo = {
            src: item.url,
            key: item.ID,
            alt: item.title,
            width: "100%",
            height: "100%",
            locName: location.title
          };
          photos.push(photo);
        });

      this.setState({ loading: false, location, photos });
    } catch (ex) {
      console.log("Something went wrong: ", ex);
    }
  }

  handleImagesLoaded = imagesLoadedInstance => {
    console.log("Images Loaded is called: ", imagesLoadedInstance);

    this.setState({ imagesLoaded: true });
  };

  render() {
    const {
      photos,
      location,
      reloadLocations,
      imagesLoaded,
      loading
    } = this.state;
    const { slug } = this.props;

    if (!slug) {
      return <h1>No Location Provided</h1>;
    }

    return (
      <React.Fragment>
        <div className="ms-loc-main-cont" style={{ minHeight: 500 }}>
          {loading && <Spinner />}

          {!loading && _.isEmpty(location) && (
            <h3 className="text-center">No Location Found</h3>
          )}
          {!loading && !_.isEmpty(location) && <Header location={location} />}
          {!loading && !_.isEmpty(location) && (
            <div className="container-fluid ms-loc-display">
              <div className="row">
                <div className="col">
                  <hr style={{ borderTop: "2px solid rgba(0, 0, 0, 0.7)" }} />
                  <div className="photos grid">
                    {location && photos && (
                      <Gallery
                        location={location}
                        photos={photos}
                        imagesLoaded={imagesLoaded}
                        onImagesLoaded={this.handleImagesLoaded}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ReactiveElements.registerReact("ms-location", Location);

export default Location;
