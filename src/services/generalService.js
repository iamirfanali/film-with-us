import http from "./httpService";

const termsEndpoint = "/all-terms?term=";

export function getAllAreas() {
  return http.get(termsEndpoint + "loc_area");
}

export function getAllStyles() {
  return http.get(termsEndpoint + "loc_style");
}

export function getAllFeatures() {
  return http.get(termsEndpoint + "loc_feature");
}

export function getAllPermits() {
  return http.get(termsEndpoint + "loc_permit");
}

export function getAllTerms() {
  return http.get("/all-terms");
}
