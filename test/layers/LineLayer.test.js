import LineLayer from "../../src/utils/stylejson/layers/LineLayer.js";

describe("LineLayer", function () {
  describe("Initialize class instance", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let line_layer;

    beforeEach(() => {
      line_layer = new LineLayer(layer_name, source_id);
    });

    it("layer_name is defined", () => {
      expect(line_layer.name).toBe(layer_name);
    });

    it("source to equal source_id is defined", () => {
      expect(line_layer.source).toBe(source_id);
    });

    it("layer type to be 'line'", () => {
      expect(line_layer.type).toBe("line");
    });
  });
  describe("Methods", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let line_layer;

    beforeEach(() => {
      line_layer = new LineLayer(layer_name, source_id);
    });

    it("formatPaintAsStyleJSON() returns valid stylejson format with default color and opacity", function () {
      let expected_result = {
        "line-color": "rgb(0, 0, 0)",
        "line-opacity": 1,
        "line-width": 1,
        "line-dasharray": [0, 0],
      };

      let formatted_paint = line_layer.formatPaintAsStyleJSON();

      expect(formatted_paint).toEqual(expected_result);
    });
  });
});
