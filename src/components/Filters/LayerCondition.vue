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
      <select v-model="attribute" class="add-filter-input-select">
        <option
          :value="attribute"
          v-for="(attribute, i) in selectItems"
          :key="i"
        >
          {{ attribute }}
        </option>
      </select>

      <select class="custom-select" v-model="operator">
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
        v-model="attributeValue"
        :placeholder="
          update.attribute ? attributes[update.attribute].toLowerCase() : null
        "
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
      selectItems: [],
      operator: null,
      attributeValue: null,
      operators: ["==", ">=", "<=", "<", ">"],
      update: { attribute: null, operator: null, value: null },
    };
  },
  mounted() {
    this.selectItems = Object.keys(this.attributes);
    this.operator = this.condition.getOperator();
    this.attribute = this.condition.getAttribute();
    this.attributeValue = this.condition.getValue();
  },
  unmounted() {
    this.attribute = "";
    this.operator = "";
    this.attributeValue = "";
  },
  methods: {
    deleteCondition: function () {
      this.$emit("delete-condition", this.condition.getId());
    },
    parseIntIfNumber: function (attribute, value) {
      if (attribute && value) {
        const number_types = ["number", "integer"];

        return number_types.includes(this.attributes[attribute].toLowerCase())
          ? parseFloat(value)
          : value;
      }
    },
  },
  watch: {
    update: {
      handler(properties) {
        if (
          properties.value != null &&
          properties.operator != null &&
          properties.attribute != null
        ) {
          this.$emit("update-condition", {
            id: this.condition.id,
            properties: properties,
          });
        }
      },
      deep: true,
    },
    attributeValue: function (newVal, oldValue) {
      let value = this.parseIntIfNumber(this.attribute, newVal);

      if (newVal) {
        this.update.value = value;
      }
    },
    attribute: function (newVal) {
      this.update.attribute = newVal;
    },
    operator: function (newVal) {
      this.update.operator = newVal;
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
