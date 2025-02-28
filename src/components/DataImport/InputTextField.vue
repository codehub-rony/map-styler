<template>
  <span><slot name="label">Style name</slot></span>
  <v-text-field
    variant="outlined"
    :rules="rulesToApply"
    density="comfortable"
    :model-value="modelValue"
    class="mb-2 mt-2"
    @update:modelValue="emitUpdate"
  ></v-text-field>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    validationRules: Array,
  },
  data() {
    return {
      ruleOptions: [
        {
          name: "not_empty",
          rule: (v) => !!v || "A name for you style is required",
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
    this.validationRules.forEach((requirement) => {
      let rule_to_apply = this.ruleOptions.find((r) => r.name === requirement);
      if (rule_to_apply) {
        this.rulesToApply.push(rule_to_apply.fn_rule);
      } else {
        console.log(`rule not found: ${requirement}`);
      }
    });
  },
  methods: {
    emitUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style></style>
