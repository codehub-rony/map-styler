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
export default {
  data() {
    return {
      type: "error",
      msg: "Password updated succesfully",
      visible: false,
      timoutInstance: null,
      alertOptions: ["success", "info", "warning", "error"],
    };
  },

  computed: {
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
    show(msg, type) {
      if (!this.alertOptions.includes(type)) {
        throw new Error(`Invalid alert type: ${type}`);
      }
      if (this.timoutInstance) {
        clearTimeout(this.timoutInstance);
        this.visible = false;
        this.timoutInstance = null;
      }
      this.type = type;
      this.msg = msg;
      this.visible = true;

      this.timoutInstance = setTimeout(() => {
        this.visible = false;
      }, 4000);
    },
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
