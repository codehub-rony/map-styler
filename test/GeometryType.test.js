import { expect } from "chai";
import GeometryType from "./src/utils/GeometryType.js";

describe("GeometryType", function () {
  describe("initialize Class instance", function () {
    it("should throw error if geometry_type parameter is undefined", function () {
      const createInstanceWithUndefinedParameter = () => {
        new GeometryType(undefined);
      };

      expect(createInstanceWithUndefinedParameter).to.throw(
        Error,
        "Missing parameter. Geometry type is undefined"
      );
    });

    it("should throw error if geometry type is not in predefined types", function () {
      const createInstance = () => {
        new GeometryType("hexagon");
      };

      expect(createInstance).to.throw(Error, "Unknown geometry type");
    });

    it("should convert MultiPolygon geometry type to polygon", function () {
      const new_instance = new GeometryType("MultiPolygon");
      expect(new_instance.geom_type).to.equal("polygon");
    });
  });
});
