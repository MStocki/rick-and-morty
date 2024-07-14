<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    class="input"
  />
</template>

<script>
import { computed } from "vue";

export default {
  name: "RmInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
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
.input {
  font-size: 1.25rem;
  border-radius: 0.5rem;
}
</style>
