<template>
  <div class="d-flex flex-row">
    <v-btn flat @click="handleDecline" variant="text">
      <slot name="decline-btn-label">cancel</slot></v-btn
    >
    <v-btn color="primary" flat @click="handleConfirm"
      ><slot name="confirm-btn-label">import</slot></v-btn
    >
  </div>
</template>
<script>
export default {
  emits: ["confirm", "decline"],

  methods: {
    handleConfirm: function () {
      this.$emit("confirm");
    },
    handleDecline: function () {
      this.$emit("decline");
    },
  },
};
</script>
