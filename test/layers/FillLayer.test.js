import FillLayer from "../../src/utils/stylejson/layers/FillLayer.js";

describe("FillLayer", function () {
  describe("Initialize class instance", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let fill_layer;

    beforeEach(() => {
      fill_layer = new FillLayer(layer_name, source_id);
    });

    it("layer_name is defined", () => {
      expect(fill_layer.name).toBe(layer_name);
    });

    it("source to equal source_id is defined", () => {
      expect(fill_layer.source).toBe(source_id);
    });

    it("layer type to be 'fill'", () => {
      expect(fill_layer.type).toBe("fill");
    });
  });
  describe("Methods", () => {
    let source_id = "test_id";
    let layer_name = "test layer";
    let fill_layer;

    beforeEach(() => {
      fill_layer = new FillLayer(layer_name, source_id);
    });

    it("formatPaintAsStyleJSON() returns valid stylejson format with default color and opacity", function () {
      let expected_result = {
        "fill-color": "rgb(255, 255, 255)",
        "fill-opacity": 0.27,
      };

      let formatted_paint = fill_layer.formatPaintAsStyleJSON();
      expect(formatted_paint).toEqual(expected_result);
    });
  });

  describe("Initialize fillLayer with stylejson", () => {
    let stylejson = {
      id: "jKDxNDGoyu",
      name: "baan 45m",
      type: "fill",
      paint: { "fill-color": "rgb(197, 225, 165)" },
      filter: ["all", ["==", "width", "45"]],
      layout: { visibility: "visible" },
      source: "runways",
      "source-layer": "runways",
    };
    let fill_layer;

    beforeEach(() => {
      fill_layer = new FillLayer(stylejson.name, stylejson.source, stylejson);
    });

    it("Should have set id", function () {
      expect(fill_layer.id).toEqual(stylejson.id);
    });

    it("Should have a filter defined", function () {
      expect(fill_layer.hasFilter()).toEqual(true);
    });

    it("Should have set the filter correctly", function () {
      expect(fill_layer.filter.getFilterAsArray()).toStrictEqual(
        stylejson.filter
      );
    });
  });
});
