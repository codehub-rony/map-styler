<template>
  <NotificationBar />
  <v-container>
    <v-row class="justify-center">
      <v-col cols="6">
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5 font-weight-light">Your account</span>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6">
        <InputTextField v-model="email" :disabled="true"
          ><template #label>Email</template></InputTextField
        >
        <InputTextField v-model="name" :disabled="true"
          ><template #label>name</template></InputTextField
        >
      </v-col>
    </v-row>
    <v-row class="justify-center" v-if="updatePassword">
      <v-col cols="6"> <v-divider></v-divider> </v-col>
    </v-row>
    <v-row class="justify-center" v-if="updatePassword">
      <v-col cols="6">
        <v-form ref="passform" v-if="updatePassword">
          <InputTextField
            v-model="password"
            :type="'password'"
            :validationRules="['not_empty']"
            ><template #label>Current password</template></InputTextField
          >
          <InputTextField
            v-model="newPassword"
            :type="'password'"
            :validationRules="['not_empty']"
            ><template #label>New password</template></InputTextField
          >
          <InputTextField
            v-model="repeatPassword"
            :type="'password'"
            :validationRules="['not_empty']"
            ><template #label>Repeat new password</template></InputTextField
          >
        </v-form>
        <div class="d-flex justify-center">
          <div
            :style="{
              visibility: errorMessage ? 'visible' : 'hidden',
            }"
            class="text-subtitle-2 error-message"
          >
            {{ errorMessage }}
          </div>
        </div>
        <div class="d-flex justify-end">
          <v-btn
            color="black"
            rounded="0"
            elevation="0"
            class="mt-2"
            variant="text"
            @click="clearPasswordUpdate"
            >cancel</v-btn
          >
          <v-btn
            color="primary"
            rounded="0"
            elevation="0"
            class="mt-2"
            @click="handleUpdatePassword"
            :loading="loading"
            >save changes</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center" v-if="!updatePassword">
      <v-col cols="3">
        <div class="d-flex flex-column self-align-start">
          <v-btn
            variant="text"
            class="text-subtitle-2 mt-5"
            @click="updatePassword = true"
            v-if="!updatePassword"
            >change password</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-cols cols="6"
        ><v-divider class="border-opacity-100"></v-divider
      ></v-cols>
    </v-row>
  </v-container>
</template>

<script>
import InputTextField from "@/components/GenericComponents/InputTextField.vue";
import NotificationBar from "@/components/GenericComponents/NotificationBar.vue";

// store
import { useAuthStore } from "@/store/auth.js";
import { useNotificationStore } from "@/store/notification.js";
import { mapActions, mapState } from "pinia";

import apiService from "@/services/apiService";

export default {
  components: {
    InputTextField,
    NotificationBar,
  },

  data() {
    return {
      name: "test",
      email: null,
      updatePassword: false,
      password: null,
      newPassword: null,
      repeatPassword: null,
      loading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  mounted() {
    this.email = this.user_email;
    apiService.User.get().then((res) => {
      this.name = res.name;
    });
  },
  methods: {
    ...mapActions(useNotificationStore, ["showNotification"]),
    handleUpdatePassword: async function () {
      const { valid } = await this.$refs.passform.validate();

      if (valid) {
        this.loading = true;
        let payload = {
          email: this.user_email,
          name: this.name,
          password: this.password,
          new_password: this.newPassword,
          confirm_new_password: this.repeatPassword,
        };
        apiService.User.update(payload)
          .then((res) => {
            this.clearPasswordUpdate();
            this.showNotification("Password updated succesfully", "success");
          })
          .catch((err) => {
            this.loading = false;

            if (err.response && err.response.data) {
              const error = err.response.data;
              this.showNotification(error.error_msg, "error");
            }
          });
      }
    },
    clearPasswordUpdate: function () {
      this.updatePassword = this.loading = false;
      this.password = this.newPassword = this.repeatPassword = "";
    },
  },
  handleDelete: function () {},
};
</script>
