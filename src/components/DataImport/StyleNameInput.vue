<template>
  <span>Style name</span>
  <v-text-field
    variant="outlined"
    :rules="validationRules"
    density="comfortable"
    v-model="styleName"
    class="mb-2 mt-2"
    @change="
      $emit('update-input', { var: 'styleName', value: $event.target.value })
    "
  ></v-text-field>
</template>

<script>
export default {
  emits: ["update-input"],
  data() {
    return {
      styleName: null,
      validationRules: [
        (v) => !!v || "A name for you style is required",
        (v) => /^[A-Za-z\s_]+$/.test(v) || "Name can only contain characters",
      ],
    };
  },
};
</script>

<style></style>
