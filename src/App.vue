<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
:root {
  --font-family: Avenir, Helvetica, Arial, sans-serif;
}

html {
  font-size: 16px;
  font-family: var(--font-family);
  background-color: #a5d6a7;
}
</style>
