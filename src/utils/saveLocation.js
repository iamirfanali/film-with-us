import _ from "lodash";

const saveLocKey = "savedLocation";

export function getSavedLocs() {
  return JSON.parse(localStorage.getItem(saveLocKey));
}

export function saveLocation(loc) {
  const currentLocs = getSavedLocs() || [];
  // check if already added
  const alreadyAdded = _(currentLocs)
    .filter(item => item.id === loc.id)
    .value();

  if (alreadyAdded.length) {
    console.log("Image already Id:", loc.id);
    return;
  }

  currentLocs.push(loc);
  localStorage.setItem(saveLocKey, JSON.stringify(currentLocs));
  return getSavedLocs();
}

export function removeLocation(id) {
  const currentLocs = getSavedLocs();
  const newLocs = _(currentLocs)
    .filter(item => item.id !== id)
    .value();
  localStorage.setItem(saveLocKey, JSON.stringify(newLocs));
  return getSavedLocs();
}

export function removeAllLocs() {
  localStorage.removeItem(saveLocKey);
}

export default {
  getSavedLocs,
  saveLocation,
  removeLocation
};
