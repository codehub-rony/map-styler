import Condition from "./Condition.js";

class Filter {
  constructor() {
    this.operator = "all";
    this.conditions = [];

    this.createCondition();
  }

  createCondition() {
    let id = this.getMaxId();
    let condition = new Condition(id);
    this.conditions.push(condition);

    return condition;
  }

  deleteCondition(condition_id) {
    console.log(condition_id, this.conditions);
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

  getFilterAsArray() {
    let result = [this.operator];

    this.conditions.forEach((condition) => {
      result.push(condition.getAsArray());
    });
    return result;
  }
}

export default Filter;

// "filter": [
//   "all",
//   [
//     "<=",
//     "bouwjaar",
//     1980
//   ],
//   [
//     ">",
//     "bouwjaar",
//     1950
//   ]
// ]
// },
