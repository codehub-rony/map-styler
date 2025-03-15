import BaseLayer from "../src/utils/stylejson/layers/BaseLayer.js";

describe("BaseLayer", function () {
  describe("Initialize class instance", () => {
    it("should throw error if source_id is missing", function () {
      const createInstance = () => {
        new BaseLayer("layer name", null, "fill");
      };
      expect(createInstance).toThrow(Error, "Missing parameter: source_id");
    });
  });
});
