/**
 * @param {array} array
 * @param {number} currentPage
 * @param {number} pageSize
 * @returns
 */

function paginate(array, currentPage, pageSize) {
  let startIndex = currentPage * pageSize;
  let endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

/**
 * @param {array} array
 * @param {string} sortBy
 * @param {string} type
 * @param {number} sortOrder
 * @returns
 */

function sorting(array, sortBy, type, sortOrder) {
  if (type == "number") return numbersSort(array, sortBy, sortOrder);
  if (type == "string") return stringsSort(array, sortBy, sortOrder);
  return array;
}

function numbersSort(array, sortBy, sortOrder) {
  return array.sort((a, b) => {
    a = a[sortBy].toUpperCase();
    b = b[sortBy].toUpperCase();

    if (a > b) return sortOrder == 1 ? 1 : -1;
    if (a < b) return sortOrder == 1 ? -1 : 1;
    return 0;
  });
}

export { paginate, sorting };
