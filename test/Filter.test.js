import Filter from "../src/utils/stylejson/Filter.js";
import Condition from "../src/utils/stylejson/Condition.js";

describe("Filter", function () {
  describe("Initialize class instance", () => {
    let filter;

    beforeEach(() => {
      filter = new Filter();
    });
    it("has one condition instance", function () {
      expect(filter.conditions).toHaveLength(1);
      expect(filter.conditions[0]).toBeInstanceOf(Condition);
    });
  });

  describe("methods", () => {
    let filter;

    beforeEach(() => {
      filter = new Filter();
    });
    it("getFilterAsArray returns valid array", function () {
      let operator = ">=";
      let attribute = "test_attribute";
      let value = 123;
      filter.createCondition(operator, attribute, value);

      let filter_as_array = filter.getFilterAsArray();

      expect(filter_as_array).toEqual(
        expect.arrayContaining([
          "all",
          expect.arrayContaining([operator, attribute, value]),
        ])
      );
    });
  });

  //   describe("Test methods for filter", () => {
  //     let base_layer;
  //     let new_filter;

  //     let layer_label = "Test name";
  //     let source_id = "test_id";
  //     let layer_type = "fill";

  //     beforeEach(() => {
  //       base_layer = new BaseLayer(layer_label, source_id, layer_type);
  //       new_filter = base_layer.createFilter();
  //     });
  //     it("setFilter returns a Filter class instance", function () {
  //       expect(new_filter).toBeInstanceOf(Filter);
  //     });
  //   });
});
