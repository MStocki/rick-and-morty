<template>
  <button class="button">{{ label }}</button>
</template>

<script>
export default {
  name: "RmButton",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.button {
  font-size: 1.25rem;
  border-radius: 0.5rem;
  padding: 0 1.25rem;
  margin: 1rem;
  background-color: #0288d1;
  text-align: center;
}
.button:hover {
  background-color: #027abc;
}
</style>
