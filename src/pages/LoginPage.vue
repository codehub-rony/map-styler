<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <div class="best align-center mSx-auto mt-">
      <v-row class="justify-center">
        <v-col cols="4">
          <div class="d-flex flex-column align-center">
            <v-img src="../assets/logo.svg" class="default-image-height" />
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
          <v-form @submit.prevent v-model="valid">
            <span class="mb-2">Email</span>
            <v-text-field
              class="mt-2 mb-2"
              v-model="email"
              :rules="emailRules"
              variant="outlined"
              @keydown.enter="handleLogin"
              rounded="0"
            ></v-text-field>
            <span class="mb-2">Password</span>
            <v-text-field
              class="mt-2 mb-2"
              v-model="password"
              :rules="passwordRules"
              variant="outlined"
              type="password"
              @keydown.enter="handleLogin"
              rounded="0"
            ></v-text-field>
          </v-form>
          <v-btn
            variant="flat"
            block
            rounded="2"
            color="primary"
            @click="handleLogin"
            :loading="loading"
            height="45.6"
            >Log in</v-btn
          >
          <v-alert
            type="error"
            :text="alertText"
            density="compact"
            variant="outlined"
            rounded="2"
            v-if="alert"
            class="mt-3"
          ></v-alert>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4"> </v-col>
      </v-row>
      <v-row class="justify-center"></v-row>
    </div>
  </v-container>
</template>

<script>
// store
import { useAuthStore } from "@/store/auth.js";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      valid: false,
      email: null,
      password: null,
      emailRules: [
        (value) => {
          if (value) return true;

          return "Email is required.";
        },
      ],
      passwordRules: [
        (value) => {
          if (value) return true;

          return "Password is required.";
        },
      ],

      alert: false,
      alertText: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["loading"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    handleLogin: async function () {
      this.alertText = null;
      if (this.email && this.password) {
        this.login(this.email, this.password)
          .then((status) => {
            this.$router.push({ name: "projects" });
          })
          .catch((error) => {
            this.showAlert(error.message);
          });
      } else {
        this.showAlert("Not all required credentials are provided");
      }
    },
    showAlert: function (msg) {
      this.alert = true;
      this.alertText = msg;

      setTimeout(() => {
        this.alert = false;
        this.alertText = "";
      }, 3000);
    },
  },
};
</script>

<style>
.best {
  width: 100%;
}

.cover-image {
  height: 450px;
}

.title-test {
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>
