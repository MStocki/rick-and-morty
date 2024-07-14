import { routeNames } from "./route-names";

const CharacterListPage = () => import("@/pages/CharacterListPage.vue");
const CharacterInfoPage = () => import("@/pages/CharacterInfoPage.vue");

export const routes = [
  {
    path: "/",
    name: routeNames.CHARACTER_LIST,
    component: CharacterListPage,
  },
  {
    path: "/:characterId",
    name: routeNames.CHARACTER_INFO,
    component: CharacterInfoPage,
  },
];
