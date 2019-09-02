import http from "./httpService";

const locations = "/locations/";
// const config = {
//   crossDomain: true
// };

export function getAllLocations() {
  return http.get(locations);
}

export function getLocation(locSlug) {
  return http.get(`${locations}/${locSlug}`);
}
