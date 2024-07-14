export const characterEndpoints = Object.freeze({
  CHARACTER_LIST_PAGE(pageNumber) {
    return `/character/?page=${pageNumber}`;
  },
  CHARACTER_INFO(characterId) {
    return `/character/${characterId}`;
  },
  SEARCH_CHARACTERS(page, name, status) {
    return `/character/?page=${page}&name=${name}&status=${status}`;
  },
});
