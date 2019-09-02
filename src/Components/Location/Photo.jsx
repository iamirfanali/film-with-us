import React from "react";

const Photo = ({ photo, onToggleAddBtn }) => {
  if (photo.selected) {
    return (
      <div className="photo enlarge">
        <div className="photo-inner">
          <img
            className="grid"
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            data-key={photo.key}
          />
          <div
            className="addtopullsheet"
            onClick={e => {
              e.stopPropagation();
              onToggleAddBtn();
            }}
          >
            {photo.addedpullsheet ? "Added" : "Add"}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="photo">
        <div className="photo-inner">
          <img
            className="grid"
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            data-key={photo.key}
          />
          <div
            className="addtopullsheet"
            onClick={e => {
              e.stopPropagation();
              onToggleAddBtn();
            }}
          >
            {photo.addedpullsheet ? "Added" : "Add"}
          </div>
        </div>
      </div>
    );
  }
};

export default Photo;
