<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    max-width="700"
  >
    <div class="best align-center mSx-auto mt-">
      <v-row class="justify-center">
        <v-cols cols="4">
          <div class="d-flex flex-column align-center">
            <v-img src="../assets/logo.svg" class="default-image-height" />
          </div>
        </v-cols>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4">
          <span class="mb-2">Email</span>
          <v-text-field
            class="mt-2"
            v-model="email"
            variant="outlined"
            @keydown.enter="onLogin"
            rounded="0"
          ></v-text-field>
          <span class="mb-2">Password</span>
          <v-text-field
            class="mt-2"
            v-model="password"
            variant="outlined"
            type="password"
            @keydown.enter="onLogin"
            rounded="0"
          ></v-text-field>
          <v-btn
            variant="flat"
            block
            rounded="0"
            color="primary"
            @click="onLogin"
            :loading="loading"
            >Log in</v-btn
          >
          <v-alert
            type="error"
            :text="alertText"
            density="compact"
            v-if="alert"
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
import { useAppStore } from "@/store/app.js";
import { mapActions } from "pinia";
export default {
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      error: null,
      alert: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["setUser"]),
    showAlert: function (msg) {
      this.alert = true;
      this.alertText = msg;

      setTimeout(() => {
        this.alert = false;
        this.alertText = "";
      }, 3000);
    },
    onLogin: async function () {
      this.error = null;

      this.loading = true;
      try {
        const response = await fetch("http://localhost:8000/api/user/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          console.log(response);
          this.showAlert("Invalid username or password.");
          throw new Error("Invalid username or password.");
        }

        const data = await response.json();

        const token = data?.token;
        console.log(data);
        if (token) {
          localStorage.setItem(
            "mapstyler_user",
            JSON.stringify({
              user_token: token,
              email: this.email,
            })
          );
          setTimeout(() => {
            this.loading = false;
            this.setUser(this.email);
            this.$router.push({ name: "editor" });
          }, 500);
        } else {
          this.loading = false;
          this.error = "Invalid login response.";
        }
      } catch (err) {
        this.loading = false;
        this.error = err.message || "An error occurred while logging in.";
      }
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
