<template>
  <div class="container">
    <h1>Character List</h1>
    <rm-input type="text" v-model="searchQuery" placeholder="Search by name" />
    <rm-select v-model="statusFilter" :options="statuses" />
    <rm-button @click="searchCharacters" label="Search" />
    <div v-if="!hasItemsToDisplay">Nothing to show</div>
    <div v-else class="list">
      <div v-for="character in itemsToDisplay" :key="character.id">
        <router-link
          class="link"
          :to="{
            name: CHARACTER_INFO_ROUTE,
            params: { characterId: character.id },
          }"
        >
          <character-card :character="character" />
        </router-link>
      </div>
    </div>
    <div class="footer">
      <rm-button v-if="showPrevButton" @click="prevPage()" label="Prev Page" />
      <rm-button v-if="showNextButton" @click="nextPage()" label="Next Page" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import {
  fetchAllCharactersByPage,
  searchCharactersByNameAndStatus,
} from "./api/characters.js";
import { routeNames } from "@/router/route-names.js";
import CharacterCard from "./components/CharacterCard.vue";
import RmButton from "@/ui/button/RmButton.vue";
import RmInput from "@/ui/input/RmInput.vue";
import RmSelect from "@/ui/select/RmSelect.vue";
import { statuses } from "./constants/statuses";
import {
  calculatePagesToDownloadFromApi,
  calulateIndexToSlice,
} from "./helpers/pagination";

export default {
  name: "CharacterList",
  components: { CharacterCard, RmButton, RmInput, RmSelect },
  setup() {
    const itemsPerPage = 12;
    const apiPageInfo = ref({
      count: 20,
      pages: 1,
    });

    const currentPage = ref(1);

    const searchQuery = ref("");
    const statusFilter = ref("");

    const hasError = ref(false);

    const characters = ref([]);

    const pagesToDownloadFromApi = ref([1]);

    const pageCount = computed(() => {
      return Math.ceil(apiPageInfo.value.count / itemsPerPage);
    });

    const startingCurrentPageIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage + 1;
    });

    const itemsToDisplay = computed(() => {
      const { startIndex, endIndex } = calulateIndexToSlice(
        startingCurrentPageIndex.value,
        currentPage.value,
        itemsPerPage
      );
      return characters.value.slice(startIndex, endIndex);
    });

    const showPrevButton = computed(() => {
      return currentPage.value > 1;
    });

    const showNextButton = computed(() => {
      return currentPage.value < pageCount.value;
    });

    const hasItemsToDisplay = computed(() => {
      return itemsToDisplay.value.length > 0;
    });

    const prevPage = () => {
      currentPage.value--;
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const updateItemsToDisplay = () => {
      pagesToDownloadFromApi.value = calculatePagesToDownloadFromApi(
        startingCurrentPageIndex.value,
        itemsPerPage,
        apiPageInfo.value.pages
      );
      fetchData();
    };

    const fetchData = () => {
      if (!searchQuery.value && !statusFilter.value) {
        getPaginationDataWithoutSearch();
      } else {
        getPaginationDataWithSearch();
      }
    };

    const getPaginationDataWithoutSearch = () => {
      characters.value = [];
      pagesToDownloadFromApi.value.forEach((page) => {
        fetchAllCharactersByPage(page)
          .then((res) => {
            apiPageInfo.value = res.pageInfo;
            characters.value = [...characters.value, ...res.items];
          })
          .catch(() => {
            hasError.value = true;
          });
      });
    };

    const getPaginationDataWithSearch = () => {
      characters.value = [];
      pagesToDownloadFromApi.value.forEach((page) => {
        searchCharactersByNameAndStatus(
          page,
          searchQuery.value,
          statusFilter.value
        )
          .then((res) => {
            apiPageInfo.value = res.pageInfo;
            characters.value = [...characters.value, ...res.items];
          })
          .catch(() => {
            hasError.value = true;
          });
      });
    };

    const searchCharacters = () => {
      currentPage.value = 1;
      searchCharactersByNameAndStatus(
        currentPage.value,
        searchQuery.value,
        statusFilter.value
      )
        .then((res) => {
          apiPageInfo.value = res.pageInfo;
          updateItemsToDisplay();
        })
        .catch(() => {
          apiPageInfo.value.count = 0;
        });
    };

    onMounted(() => {
      updateItemsToDisplay();
    });

    watch(currentPage, () => {
      updateItemsToDisplay();
    });

    return {
      CHARACTER_INFO_ROUTE: routeNames.CHARACTER_INFO,
      statuses,
      itemsToDisplay,
      showPrevButton,
      showNextButton,
      hasItemsToDisplay,
      searchQuery,
      statusFilter,
      prevPage,
      nextPage,
      searchCharacters,
    };
  },
};
</script>
<style scoped>
.container {
  text-align: center;
}

.link {
  text-decoration: none;
  color: inherit;
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;
  margin: auto;
  box-sizing: border-box;
}

.card:hover {
  background-color: #72bdc0;
}

@media (max-width: 768px) {
  .list {
    grid-template-columns: 1fr;
  }
}
</style>
