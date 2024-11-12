import NewFillLayer from "../src/utils/stylejson/layers/NewFillLayer.js";

describe("NewFillLayer", function () {
  describe("Initialize", () => {
    let styleobject = {
      id: "wLAaPkIKnp",
      source: "municipalities",
      type: "line",
      paint: {
        "fill-color": "rgb(255, 255, 255)",
        "fill-opacity": 0.5,
      },
      layout: {
        visibility: "visible",
      },
    };
    it("Throw error if input parameter not of type object", function () {
      const createInstance = () => {
        new NewFillLayer("test");
      };
      expect(createInstance).toThrow("Input is not of type 'object'");
    });
    ("source_id is undefined");
    it("Throw error if source_id is not defined", function () {
      const createInstance = () => {
        new NewFillLayer({ source: null });
      };
      expect(createInstance).toThrow(
        "required attribute 'source' is undefined"
      );
    });
    it("Throw error if type attribute not 'fill'", function () {
      const createInstance = () => {
        new NewFillLayer({ source: "test", type: "line" });
      };
      expect(createInstance).toThrow("layer is not of type 'fill'");
    });

    it("Source is set correctly", function () {
      const createInstance = () => {
        let layer = new NewFillLayer({ source: "test", type: "fill" });
        return layer.source;
      };
      expect(createInstance()).toBe("test");
    });
  });
});
