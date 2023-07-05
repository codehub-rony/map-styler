<template>
  <v-sheet class="attribute-container pa-5">
    <div class="d-flex justify-space-between align-center">
      <div class="attribute-title">width:</div>
      <div>
        <input
          v-model="value"
          type="number"
          id="lname"
          name="lname"
          class="pa-1 attribute-text-field text-caption"
        />
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    property: Object,
  },
  data() {
    return {
      value: 1,
    };
  },
  mounted() {
    this.value = this.property.value;
  },
  watch: {
    value: function () {
      this.$emit("update-width", {
        attribute: this.property.attribute,
        value: this.value,
      });
    },
  },
};
</script>

<style>
.attribute-container {
  width: 100% !important;
}

.attribute-title {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 1rem;
}

.attribute-text-field {
  width: 35px;
  height: 20px;
  border: 1px solid rgba(211, 211, 211);
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
