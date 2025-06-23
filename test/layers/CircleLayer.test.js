import CircleLayer from "../../src/utils/stylejson/layers/CircleLayer.js";

describe("CircleLayer", function () {
  describe("Initialize class instance", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let circle_layer;

    beforeEach(() => {
      circle_layer = new CircleLayer(layer_name, source_id);
    });

    it("layer_name is defined", () => {
      expect(circle_layer.name).toBe(layer_name);
    });

    it("source to equal source_id is defined", () => {
      expect(circle_layer.source).toBe(source_id);
    });

    it("layer type to be 'cicle'", () => {
      expect(circle_layer.type).toBe("circle");
    });
  });
  describe("Methods", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let circle_layer;

    beforeEach(() => {
      circle_layer = new CircleLayer(layer_name, source_id);
    });

    it("formatPaintAsStyleJSON() returns valid stylejson format with default color and opacity", function () {
      let expected_result = {
        "circle-color": "rgb(232, 227, 223)",
        "circle-opacity": 1,
        "circle-radius": 4,
        "circle-stroke-color": "rgb(54, 154, 204)",
        "circle-stroke-width": 1,
      };

      let formatted_paint = circle_layer.formatPaintAsStyleJSON();
      expect(formatted_paint).toEqual(expected_result);
    });
  });
});
