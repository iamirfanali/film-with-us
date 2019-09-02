import React from "react";
import LocSlider from "./locSlider";

const ListSliders = ({ list, filteredLocsCount }) => {
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <div className="ms-listing-grid">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <hr style={{ borderTop: "2px solid rgba(0, 0, 0, 0.7)" }} />
          </div>
        </div>

        <div className="row p-1">
          {!filteredLocsCount && (
            <div className="col">
              <p className="text-center ms-empty-loc-text">No Location Found</p>
            </div>
          )}

          {list &&
            list.map(
              loc => loc.filtered && <LocSlider key={loc.id} loc={loc} />
            )}
        </div>
      </div>
    </div>
  );
};

export default ListSliders;
