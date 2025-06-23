<template>
  <span class="text-body-2">{{ property.component.label }}</span>
  <input
    v-model="property.value"
    type="number"
    id="name"
    name="name"
    class="pa-1 attribute-text-field text-caption"
  />
</template>

<script>
export default {
  props: {
    property: Object,
  },
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    this.value = this.property.value;
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
