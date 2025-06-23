import Condition from "./Condition.js";

class Filter {
  constructor() {
    this.operator = "all";
    this.conditions = [];
  }

  createCondition(operator, attribute, value) {
    // consider returnign empty condition object and not pushing it conditions array.
    // I think that introduces an error when rendering the style
    let id = this.getMaxId();
    let condition = new Condition(id, operator, attribute, value);
    this.conditions.push(condition);
    return id;
  }

  deleteCondition(condition_id) {
    this.conditions = this.conditions.filter(
      (condition) => condition.id !== condition_id
    );
  }

  getMaxId() {
    if (this.conditions.length === 0) {
      return 0;
    }

    let ids = this.conditions.map((obj) => obj.id);
    const maxId = Math.max(...ids);
    let newId = maxId + 1;
    return newId;
  }

  getOperator() {
    return this.operator;
  }

  setConditions(update) {
    this.conditions.forEach((condition) => {
      if (condition.getId() === update.id) {
        condition.update(update.properties);
      }
    });
  }

  getFilterAsArray() {
    let result = [this.operator];

    this.conditions.forEach((condition) => {
      result.push(condition.getAsArray());
    });
    return result;
  }
}

export default Filter;
