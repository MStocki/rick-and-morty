<template>
  <div class="container">
    <h1>Character Info</h1>
    <character-card detailed :character="character" class="character_card" />
    <router-link :to="{ name: RETURN_ROUTE }" #default="{ navigate }">
      <rm-button @click="navigate" label="Return" />
    </router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchCharacterById } from "./api/characters.js";
import { routeNames } from "@/router/route-names.js";
import { useRoute } from "vue-router";
import CharacterCard from "./components/CharacterCard.vue";
import RmButton from "@/ui/button/RmButton.vue";

export default {
  name: "CharacterInfo",
  components: { CharacterCard, RmButton },
  setup() {
    const { params } = useRoute();
    const character = ref({});
    const hasError = ref(false);

    const getTypeLabel = (type) => {
      return type ? type : "unknown";
    };

    const fetchData = () => {
      fetchCharacterById(params.characterId)
        .then((res) => {
          character.value = res;
        })
        .catch(() => {
          hasError.value = true;
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      RETURN_ROUTE: routeNames.CHARACTER_LIST,
      character,
      getTypeLabel,
    };
  },
};
</script>
<style>
.container {
  text-align: center;
}
.character_card {
  margin: auto;
}
</style>
