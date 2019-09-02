import _ from "lodash";

export function getTerms(terms, type) {
  return _(terms)
    .filter(item => item.taxonomy === type)
    .value();
}
