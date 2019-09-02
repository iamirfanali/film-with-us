import http from "./httpService";

const allCatEndpoint = "/all-terms?term=loc_cat";
const oneCatEndpoint = "/loc_cat/";
const selectedCatEndpoint = "/options/acf/field_5ca2eaecb9afa";

export function getCategories() {
  return http.get(allCatEndpoint);
}

export function getSelectedCategories() {
  return http.get(selectedCatEndpoint);
}

export function getCategoryLocation(catSlug) {
  return http.get(oneCatEndpoint + catSlug);
}
