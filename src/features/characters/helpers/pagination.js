const itemsApiPerPage = 20;

const calculatePagesToDownloadFromApi = (
  startingCurrentPageIndex,
  itemsPerPage,
  apiCountPages
) => {
  const pages = [];

  const endingCurrentPageIndex = startingCurrentPageIndex + (itemsPerPage - 1);
  const startPageNumber = Math.ceil(startingCurrentPageIndex / itemsApiPerPage);
  const endPageNumber = Math.ceil(endingCurrentPageIndex / itemsApiPerPage);

  pages.push(startPageNumber);
  if (!pages.includes(endPageNumber) && endPageNumber <= apiCountPages) {
    pages.push(endPageNumber);
  }
  return pages;
};

const calulateIndexToSlice = (
  startingCurrentPageIndex,
  currentPage,
  itemsPerPage
) => {
  const divider = Math.floor(startingCurrentPageIndex / itemsApiPerPage);
  const startIndex =
    (currentPage - 1) * itemsPerPage - divider * itemsApiPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    startIndex,
    endIndex,
  };
};

export { calculatePagesToDownloadFromApi, calulateIndexToSlice };
