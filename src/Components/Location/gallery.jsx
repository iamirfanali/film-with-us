import React, { Component } from "react";
import Photo from "./Photo";
import ReactDOM from "react-dom";
import Masonry from "react-masonry-component";
import { getSavedLocs } from "./../../utils/saveLocation";
import SaveLocation from "./../saveLocation";
import _ from "lodash";
import { saveLocation, removeLocation } from "../../utils/saveLocation";
import Spinner from "./../common/spinner";
import ImagesLoaded from "react-images-loaded";

const masonryOptions = {
  transitionDuration: 500,
  columnWidth: ".masonry-sizer",
  itemSelector: ".photo",
  percentPosition: true
  // initLayout: false
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: this.props.photos,
      location: this.props.location
      // imagesLoaded: false
    };
  }

  saveLocation = "";
  masonry = "";

  async componentDidMount() {
    // Rendering
    ReactDOM.render(
      <SaveLocation
        ref={ref => (this.saveLocation = ref)}
        onRemoveLoc={this.removeFromPullSheet}
      />,
      document.getElementById("ms-save-location")
    );

    //Checking already added images

    const savedLocs = await getSavedLocs();
    let { photos } = this.state;

    photos.map(photo => {
      const { key } = photo;
      const result = _.find(savedLocs, loc => loc.id == key);
      console.log("Key is: ", key);
      console.log("Result is: ", result);

      if (result) {
        photo.addedpullsheet = true;
        console.log("Result is: ", result["id"]);
      }
    });

    console.log("Photos in Locations GAllery component: ", photos);
    console.log("Saved Locations in Gallery component are: ", savedLocs);
  }

  handleLayoutComplete = () => {
    // console.log("Layout complete is call");
  };

  clickImage = e => {
    console.log("OnClick is called: ", e);
    e.preventDefault();
    e.stopPropagation();

    console.log("Has attribues:  ", e.target.getAttribute("data-key"));
    let key = e.target.getAttribute("data-key");

    if (!key) {
      console.log("ClickImage key is undefined", e);
      return;
    }

    let photos = this.state.photos;
    photos.map(p => {
      if (p.key == key) {
        p.selected = !p.selected;
      } else p.selected = false;
    });

    this.setState({ photos: photos });
    // this.masonry.layout();
  };

  toggleAddBtn = id => {
    if (!id) {
      console.log("ToggleAddBtn id is undefined", id);
      return;
    }
    const { photos, location } = this.state;

    let selected = _(photos)
      .filter(photo => photo.key == id)
      .value()[0];

    const newLocation = {
      id: selected.key,
      name: selected.alt,
      src: selected.src,
      locName: selected.locName,
      locPermalink: location.permalink
    };

    if (selected.addedpullsheet) removeLocation(id);
    else saveLocation(newLocation);

    selected.addedpullsheet = !selected.addedpullsheet;
    this.saveLocation.refreshLocations(true);

    const selectedIndex = _.findIndex(photos, ["key", id]);

    photos[selectedIndex] = selected;

    this.setState({ photos });
  };

  removeFromPullSheet = (id, removeAll = false) => {
    console.log("Remove from pullsheet is called: ", id);
    const { photos } = this.state;

    if (removeAll) {
      photos.map(photo => (photo.addedpullsheet = false));
    } else {
      const selectedIndex = _.findIndex(photos, ["key", id]);
      photos[selectedIndex].addedpullsheet = false;
    }

    this.setState({ photos });
  };

  handleOnAlways = instance => {
    console.log("Handle Always is called: ", instance);
    this.setState({ imagesLoaded: true });
  };

  handleOnProgress = (instance, image) => {
    console.log("Handle Progress is called: ", instance, image);
  };

  handleOnFail = instance => {
    console.log("Hannle Fail is called: ", instance);
  };

  handleDone = instance => {
    console.log("Handle Done is called:", instance);
  };

  renderImages(photos) {
    return (
      <ImagesLoaded
        elementType={"div"} // defaults to 'div'
        className={"images-loaded-container"} // defaults to 'images-loaded-container'
        style={{ display: this.state.imagesLoaded ? "block" : "none" }}
        onAlways={this.handleOnAlways}
        onProgress={this.handleOnProgress}
        onFail={this.handleOnFail}
        done={this.handleDone}
      >
        {photos.map((item, index) => {
          return (
            <Photo
              key={index}
              photo={item}
              onToggleAddBtn={() => this.toggleAddBtn(item.key)}
            />
          );
        })}
      </ImagesLoaded>
    );
  }

  render() {
    const { photos, location } = this.props;
    const { imagesLoaded } = this.state;

    return (
      <React.Fragment>
        {!imagesLoaded && <Spinner />}
        <Masonry
          className={"photos-masonry"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false}
          onImagesLoaded={data => {
            console.log("All images are loaded: ", data);
            // this.setState({ imagesLoaded: true });
          }}
          onLayoutComplete={() => console.log("On Layout complete is called")}
          onClick={e => {
            this.clickImage(e);
          }}
          ref={c => {
            this.masonry = c && c.masonry;
          }}
        >
          <div className="masonry-sizer" />

          {this.renderImages(photos)}
        </Masonry>
      </React.Fragment>
    );
  }
}

export default Gallery;
