import chai from "chai";
const expect = chai.expect
import BaseLayer from "src/utils/BaseLayer.js"

describe("BaseLayer", function () {
  describe("Initialize class instance", () => {
    it("should throw error if layer_name parameter is missing", function () {
      const createInstance = () => {
        new BaseLayer(null, "source_id", "fill");
      };
      expect(createInstance).to.throw(
        Error,
        "Missing parameter: layer_name is undefined"
      );
    });
    it("should throw error if source_id parameter is missing", function () {
        const createInstance = () => {
          new BaseLayer('layer_name', null, "fill");
        };
        expect(createInstance).to.throw(
          Error,
          "Missing parameter: source_id is undefined"
        );
      });
      it("should throw error if type parameter is missing", function () {
        const createInstance = () => {
          new BaseLayer('layer_name', "source_id", null);
        };
        expect(createInstance).to.throw(
          Error,
          "Missing parameter: type is undefined"
        );
      });
  });
  describe("Methods", function () {
    it("hasFilter() should return boolean", function () {
      let layer = new BaseLayer('layer_name', 'source_id', 'fill');


      expect(layer.hasFilter()).to.be.a("boolean");
    });
  });
});
