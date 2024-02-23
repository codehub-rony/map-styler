<template>
  <div class="d-flex flex-column pb-1">
    <div class="d-flex flex-row">
      <v-btn
        variant="text"
        icon="mdi-window-close"
        color="grey"
        size="x-small"
        @click="deleteCondition"
      ></v-btn>
      <select v-model="test.attribute" class="add-filter-input-select">
        <option
          :value="attribute"
          v-for="(attribute, i) in properties"
          :key="i"
        >
          {{ attribute }}
        </option>
      </select>

      <select class="custom-select" v-model="test.operator">
        <option
          class="custom-select-option"
          :value="operator"
          v-for="(operator, i) in operators"
          :key="i"
        >
          {{ operator }}
        </option>
      </select>

      <input
        class="add-filter-input-select"
        id="filter-input-type"
        v-model="test.value"
      />
    </div>
  </div>
</template>
<script>
export default {
  emits: ["update-condition", "delete-condition"],
  props: {
    condition: Object,
    attributes: Object,
  },
  data() {
    return {
      attribute: null,
      properties: [],
      operator: null,
      value: null,
      operators: ["==", ">=", "<=", "<", ">"],
      test: { attribute: null, operator: null, value: null },
    };
  },
  mounted() {
    this.properties = Object.keys(this.attributes);
    this.operator = this.condition.getOperator();
    this.attribute = this.condition.getAttribute();
    this.value = this.condition.getValue();

    this.test = {
      operator: this.condition.getOperator(),
      value: this.condition.getValue(),
      attribute: this.condition.getAttribute(),
    };
  },
  unmounted() {
    this.attribute = "";
    this.operator = "";
    this.value = "";
  },
  methods: {
    deleteCondition: function () {
      this.$emit("delete-condition", this.condition.getId());
    },
    parseIntIfNumber: function (attribute, value) {
      if (attribute && value) {
        const number_types = ["number", "integer"];

        return number_types.includes(this.attributes[attribute].toLowerCase())
          ? parseInt(value)
          : value;
      }
    },
  },
  watch: {
    test: {
      handler(properties) {
        properties.value = this.parseIntIfNumber(
          properties.attribute,
          properties.value
        );

        this.$emit("update-condition", {
          id: this.condition.id,
          properties: properties,
        });
      },
      deep: true,
    },
  },
};
</script>

<style>
.add-filter-input-select {
  width: 100%;
  padding: 4px 10px 4px 10px;
  font-size: small;
  border-radius: 0px;
  border: 1px solid lightgrey;
}
.custom-select {
  padding: 4px 10px 4px 10px;
  border: 1px solid lightgrey;
  font-size: small;
  color: #1c87c9;
  border-radius: 0px;
}

.custom-select-option {
  border-radius: 0px;
}
</style>
