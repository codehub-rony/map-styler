<template>
  <transition name="fade" @after-leave="onAfterLeave">
    <v-alert
      v-if="visible"
      class="notification-bar-container"
      :class="fadeClass"
      :icon="bannerIcon"
      :color="type"
      closable
      :text="msg"
      variant="outlined"
      border="start"
      elevation="0"
      rounded="0"
    ></v-alert>
  </transition>
</template>

<script>
import { useNotificationStore } from "@/store/notification.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(useNotificationStore, ["visible", "msg", "type"]),
    bannerIcon: function () {
      switch (this.type) {
        case "error":
          return "mdi-close-circle";
        case "warning":
          return "mdi-alert-circle";
        case "info":
          return "mid-information";
        default:
          return "mdi-check-circle";
      }
    },
  },

  methods: {
    closeAlert() {
      this.visible = false;
    },
    onAfterLeave() {
      this.message = null;
    },
  },
};
</script>

<style>
.notification-bar-container {
  padding: 10px;
  position: absolute;
  right: 0px;
  top: 80px;

  z-index: 9999;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, right 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  right: -100px;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  right: 0;
}
</style>
