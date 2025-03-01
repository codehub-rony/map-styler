<template>
  <v-btn :color="color" flat @click="$emit('click')"
    ><slot name="label">import</slot></v-btn
  >
</template>

<script>
export default {
  emits: ["click"],
  props: {
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>
