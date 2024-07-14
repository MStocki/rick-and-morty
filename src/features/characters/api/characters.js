import { characterEndpoints } from "../constants/endpoints";
import { prepareUrl } from "@/utils/request.js";

const fetchAllCharactersByPage = async (pageNumber) => {
  const res = await fetch(
    prepareUrl(characterEndpoints.CHARACTER_LIST_PAGE(pageNumber))
  );

  if (!res.ok) {
    throw new Error(res.status);
  }

  const { results: items, info: pageInfo } = await res.json();
  return {
    pageInfo,
    items: items.map((item) => mapCharacter(item)),
  };
};

const searchCharactersByNameAndStatus = async (page, name, status) => {
  const res = await fetch(
    prepareUrl(characterEndpoints.SEARCH_CHARACTERS(page, name, status))
  );

  if (!res.ok) {
    throw new Error(res.status);
  }

  const { results: items, info: pageInfo } = await res.json();
  return {
    pageInfo,
    items: items.map((item) => mapCharacter(item)),
  };
};

const fetchCharacterById = async (characterId) => {
  const res = await fetch(
    prepareUrl(characterEndpoints.CHARACTER_INFO(characterId))
  );

  if (!res.ok) {
    throw new Error(res.status);
  }

  const json = await res.json();

  return mapCharacter(json);
};

const mapCharacter = ({ id, name, image, status, type, gender }) => ({
  id,
  name,
  image,
  status,
  type,
  gender,
});

export {
  fetchAllCharactersByPage,
  fetchCharacterById,
  searchCharactersByNameAndStatus,
};
