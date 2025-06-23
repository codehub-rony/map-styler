class Condition {
  constructor(id, operator = ">=", attribute, value) {
    this.id = id;
    this.operator = operator;
    this.attribute = attribute;
    this.value = value;
  }

  getId() {
    return this.id;
  }

  getOperator() {
    return this.operator;
  }

  setOperator(value) {
    this.operator = value;
  }

  getAttribute() {
    return this.attribute;
  }

  setAttribute(value) {
    this.attribute = value;
  }

  getValue() {
    return this.value;
  }

  update(properties) {
    this.setAttribute(properties.attribute);
    this.setValue(properties.value);
    this.setOperator(properties.operator);
  }

  setValue(value) {
    this.value = value;
  }

  asObject() {
    return {
      id: this.id,
      condition: [this.operator, this.attribute, this.value],
    };
  }

  getAsArray() {
    return [this.operator, this.attribute, this.value];
  }
}

export default Condition;
