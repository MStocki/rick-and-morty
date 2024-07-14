<template>
  <div class="card">
    <img :src="character.image" :alt="character.name" class="card__image" />
    <h3>{{ character.name }}</h3>
    <div v-if="detailed">
      <p>Type: {{ getTypeLabel(character.type) }}</p>
      <p>Gender: {{ character.gender }}</p>
    </div>
    <div v-else>
      <p>Status: {{ character.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterCard",
  props: {
    character: {
      type: Object,
      required: true,
    },
    detailed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const getTypeLabel = (type) => {
      return type ? type : "unknown";
    };

    return {
      getTypeLabel,
    };
  },
};
</script>
<style>
.card {
  width: 20rem;
  border-radius: 20px;
  padding: 1rem;
  margin: 10px;
  background-color: #b2ebf2;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card__image {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  object-fit: cover;
}

@media (max-width: 768px) {
  .card {
    width: 15rem;
  }
}
</style>
