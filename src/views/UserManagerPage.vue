<template>
  <v-container width="500">
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
        <InputTextField v-model="name"
          ><template #label>name</template></InputTextField
        >

        <div v-if="updatePassword">
          <InputTextField
            ><template #label>Old password</template></InputTextField
          >
          <InputTextField
            ><template #label>New password</template></InputTextField
          >
          <InputTextField
            ><template #label>Repeat new password</template></InputTextField
          >
          <v-btn>save</v-btn>
          <v-btn @click="updatePassword = false">cancel</v-btn>
        </div>
        <div class="d-flex flex-column self-align-start">
          <v-btn
            variant="text"
            class="text-subtitle-2"
            @click="updatePassword = true"
            v-if="!updatePassword"
            >change password</v-btn
          >
          <v-btn variant="text" class="text-subtitle-2" color="red"
            >delete account</v-btn
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

// store
import { useAuthStore } from "@/store/auth.js";
import { update } from "lodash";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    InputTextField,
  },

  data() {
    return {
      name: "test",
      email: null,
      updatePassword: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_email"]),
  },
  mounted() {
    this.email = this.user_email;
  },
};
</script>

<!-- <InputTextField
v-model="projectName"
:validationRules="['not_empty']"
ref="projectname"
><template #label>Project name</template> -->
