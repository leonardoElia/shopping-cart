const getSavedCartItems = (item) => {
  const produto = localStorage.getItem(item);
  return produto;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
