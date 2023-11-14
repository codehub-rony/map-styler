<template>
  <div class="d-flex flex-column pb-1">
    <div class="d-flex flex-row">
      <DeleteButton @click="handleEvent" />
      <select v-model="attribute" class="add-filter-input-select">
        <option
          :value="attribute"
          v-for="(attribute, i) in properties"
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

      <input class="add-filter-input-select" id='filter-input-type' v-model="value" />
    </div>
  </div>
</template>
<script>
import DeleteButton from "@/components/DeleteButton.vue";

export default {
  emits: ["update-condition", "remove-condition"],
  components: {
    DeleteButton,
  },
  props: {
    filter: Object,
    attributes: Object,
  },
  data() {
    return {
      attribute: null,
      properties: [],
      operator: "==",
      value: null,
      operators: ["==", ">=", "<=", "<", ">"],
    };
  },
  mounted() {
    this.properties = Object.keys(this.attributes)
    this.attribute = this.filter.condition[1]

  },
  unmounted() {
    this.attribute = '';
    this.operator = '';
    this.value = '';
  },
  methods: {
    handleEvent: function () {
      this.$emit("remove-condition", this.filter);
    },
    parseIntIfNumber: function() {
      const number_types = ['number', 'integer']
      
      return number_types.includes(this.attributes[this.attribute].toLowerCase())  ? parseInt(this.value) : this.value

    },
    updateFilter: function() {
      let value = this.parseIntIfNumber()
      this.$emit("update-condition", {
        id: this.filter.id,
        condition: [this.operator, this.attribute, value],
      });

    }
  },
  watch: {
    attribute: function () {    
      this.updateFilter()
    },
    operator: function () {
      this.updateFilter()
    },
    value: function () {
      this.updateFilter()

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
