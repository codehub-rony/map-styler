<template>
  <span class="text-body-2">{{ attribute.component.label }}</span>
  <div>
    <input
      v-model="gap"
      type="number"
      id="name"
      name="name"
      class="pa-1 attribute-text-field text-caption"
    />
    -
    <input
      v-model="dash"
      type="number"
      id="name"
      name="name"
      class="pa-1 attribute-text-field text-caption"
    />
  </div>
</template>

<script>
export default {
  props: {
    attribute: Object,
  },
  data() {
    return {
      dash: 0,
      gap: 0,
    };
  },
  mounted() {
    this.gap = this.attribute.value[0];
    this.dash = this.attribute.value[1];
  },
  watch: {
    dash: function (newVal) {
      this.attribute.set(0, newVal);
    },
    gap: function (newVal) {
      this.attribute.set(1, newVal);
    },
  },
};
</script>
<style>
.attribute-text-field {
  width: 35px;
  height: 20px;
  border: 1px solid rgb(207, 205, 205);
  border-radius: 1px;
  box-sizing: border-box;
  text-align: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
