<template>
  <span><slot name="label">Style name</slot></span>
  <v-text-field
    :model-value="modelValue"
    variant="outlined"
    :rules="rulesToApply"
    density="comfortable"
    class="mb-2 mt-2"
    :type="type === 'password' ? (showPassword ? 'text' : 'password') : 'text'"
    :disabled="disabled"
    @update:modelValue="emitUpdate"
    :append-inner-icon="
      type === 'password' ? (showPassword ? 'mdi-eye-off' : 'mdi-eye') : ''
    "
    @click:append-inner="showPassword = !showPassword"
  ></v-text-field>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    validationRules: Array,
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      showPassword: false,
      ruleOptions: [
        {
          name: "not_empty",
          fn_rule: (v) => !!v || "Required field",
        },
        {
          name: "only_char",
          fn_rule: (v) =>
            /^[A-Za-z\s_]+$/.test(v) || "Name can only contain characters",
        },
      ],
      rulesToApply: [],
    };
  },
  mounted() {
    if (this.validationRules) {
      this.validationRules.forEach((requirement) => {
        let rule_to_apply = this.ruleOptions.find(
          (r) => r.name === requirement
        );

        if (rule_to_apply) {
          this.rulesToApply.push(rule_to_apply.fn_rule);
        } else {
          console.log(`rule not found: ${requirement}`);
        }
      });
    }
  },
  methods: {
    emitUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style></style>
