export const makePropsSubset = function (props, subset, exclude) {
  if (!Array.isArray(subset)) {
    subset = Object.keys(subset)
  }

  return subset.reduce((obj, key) => {
    if (exclude == null || exclude.indexOf(key) == -1) {
      obj[key] = props[key]
    }
    return obj
  }, {})
}
