import BaseLayer from "../src/utils/stylejson/layers/BaseLayer.js";
import Filter from "../src/utils/stylejson/Filter.js";
import FillLayer from "../src/utils/stylejson/layers/FillLayer.js";
import Condition from "../src/utils/stylejson/Condition.js";

describe("BaseLayer", function () {
  describe("Initialize class instance", () => {
    let layer_label = "Test name";
    let source_id = "test_id";
    let layer_type = "fill";
    let base_layer;

    beforeEach(() => {
      base_layer = new BaseLayer(layer_label, source_id, layer_type);
    });

    it("should throw error if source_id is missing", function () {
      const createInstance = () => {
        new BaseLayer("layer name", null, "fill");
      };
      expect(createInstance).toThrow(Error, "Missing parameter: source_id");
    });

    it("should have label attribute", function () {
      expect(base_layer).toHaveProperty("name");
    });

    it("should have auto genreated label if not provided", () => {
      let baselayer_nolabel = (base_layer = new BaseLayer(
        null,
        source_id,
        layer_type
      ));

      expect(baselayer_nolabel.name).toBe("new fill");
    });

    it("should have set label if provided", () => {
      expect(base_layer.name).toBe("Test name");
    });
  });

  describe("Methods", () => {
    let layer_label = "Test name";
    let source_id = "test_id";
    let fill_layer;

    beforeEach(() => {
      fill_layer = new FillLayer(layer_label, source_id);
    });

    describe("Visibility", () => {
      it("throws error if input not boolean", function () {
        expect(() => {
          fill_layer.setVisibility("not boolean");
        }).toThrow("Input must be a boolean value");
      });
      it("Value is is true and returned correctly", function () {
        expect(fill_layer.getVisibility()).toBe(true);
      });
      it("Value is updated correctly", function () {
        fill_layer.setVisibility(false);
        expect(fill_layer.getVisibility()).toBe(false);
      });
    });
    describe("Filter", () => {
      let base_layer;
      let new_filter;

      let layer_label = "Test name";
      let source_id = "test_id";
      let layer_type = "fill";

      beforeEach(() => {
        base_layer = new BaseLayer(layer_label, source_id, layer_type);
        new_filter = base_layer.createFilter();
      });

      it("hasFilter returns false if not set", () => {
        expect(base_layer.hasFilter()).toStrictEqual(false);
      });
      it("hasFilter returns true if set", () => {
        base_layer.setFilter(new_filter);
        expect(base_layer.hasFilter()).toStrictEqual(true);
      });
      it("createFilter returns a Filter class instance", function () {
        expect(new_filter).toBeInstanceOf(Filter);
      });

      it("setFilter updates filter and is Filter class instance", function () {
        let updated_filter = { operator: "all", conditions: [] };
        let condition = new Condition("==", "test_attribute", 123);
        updated_filter.conditions.push(condition);

        base_layer.setFilter(updated_filter);

        expect(base_layer.filter).toStrictEqual(updated_filter);
        expect(base_layer.filter).toBeInstanceOf(Object);
      });
    });
  });
});
