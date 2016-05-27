export const makePropsSubset = function (props, subSetKeys) {
  if (!Array.isArray(subSetKeys)) {
    subSetKeys = Object.keys(subSetKeys)
  }

  return subSetKeys.reduce((obj, key) => {
    obj[key] = props[key]
    return obj
  }, {})
}
