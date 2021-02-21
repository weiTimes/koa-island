function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true;
    }
  }

  return false;
}

module.exports = {
  isThisType,
};
