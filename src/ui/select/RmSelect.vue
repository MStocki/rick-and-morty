<template>
  <select v-model="value" class="select">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import { computed } from "vue";

export default {
  name: "RmSelect",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Object],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        ctx.emit("update:modelValue", val);
      },
    });

    return {
      value,
    };
  },
};
</script>
<style>
.select {
  font-size: 1.25rem;
  border-radius: 0.5rem;
}
</style>
