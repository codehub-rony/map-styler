import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    visible: false,
    msg: "",
    type: "success",
    timoutInstance: null,
    notificationOptions: ["success", "info", "warning", "error"],
  }),
  actions: {
    showNotification(msg, type = "success") {
      if (!this.notificationOptions.includes(type)) {
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
    hide() {
      this.visible = false;
    },
  },
});
