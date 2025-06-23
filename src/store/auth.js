// Utilities
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user_email: null,
    user_token: null,
    loading: false,
    localstorage_token_name: "mapstyler_user",
  }),

  actions: {
    async login(email, password) {
      this.loading = true;

      try {
        const api_baseUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${api_baseUrl}/user/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid email or password.");
        }

        const data = await response.json();
        const token = data?.token;

        if (token) {
          this.user_email = email;
          this.user_token = token;
          localStorage.setItem(
            this.localstorage_token_name,
            JSON.stringify({
              user_token: token,
              email: email,
            })
          );
          setTimeout(() => {
            return;
          }, 500);
        } else {
          throw new Error("Invalid login response.");
        }
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout: function () {
      this.user_email = null;
      this.user_token = null;
      localStorage.removeItem(this.localstorage_token_name);
    },
    setUser: function (user) {
      this.user_email = user.email;
      this.user_token = user.user_token;
    },
    isAuthenticated: function () {
      if (this.user_email && this.user_token) {
        return true;
      } else {
        return false;
      }
    },
  },
});
