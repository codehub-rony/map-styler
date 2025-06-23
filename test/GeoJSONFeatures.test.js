import GeoJSONFeatures from "../src/utils/datasources/GeoJSONFeatures.js";
import StyleJSON from "../src/utils/datasources/StyleJSON.js";
import demo_data from "./demo_data.js";

describe("GeoJSONFeatures", function () {
  describe("Initiate GeoJSONFeatures instance", () => {
    let json_as_string = demo_data.asString();
    let geojson = demo_data.asObject();

    //   beforeEach(() => {
    //     let stylename = 'test geojson'
    //     dataSource = new GeoJSONFeatures(stylename, json_as_string);
    //   });

    it("initializes with geojson as an object without parsing", function () {
      const instance = new GeoJSONFeatures("test geojson", geojson);
      expect(instance).toBeInstanceOf(GeoJSONFeatures);
    });

    it("initializes with geojson as an string with parsing", function () {
      const instance = new GeoJSONFeatures("test geojson", json_as_string);
      expect(instance).toBeInstanceOf(GeoJSONFeatures);
    });

    it("source_id attribute is set", function () {
      let style_name = "test geojson";
      const instance = new GeoJSONFeatures(style_name, json_as_string);
      expect(instance.source_id).toBe(style_name);
    });

    it("geojson attributeis set", function () {
      let style_name = "test geojson";
      const instance = new GeoJSONFeatures(style_name, geojson);
      expect(instance.geojson).toEqual(geojson);
    });

    it("style_name attribute is set with correct value and has getter", function () {
      let stylename = "test style";
      const instance = new GeoJSONFeatures(stylename, geojson);
      expect(instance.name).toBe(stylename);
    });
  });
});

//   it("initializes with geojson as a string with parsing", function () {

//     expect(dataSource).toBeInstanceOf(OGCVectorTiles);
//   });

//     it("instance of StyleJSON is created", function () {
//       expect(dataSource.stylejson).toBeInstanceOf(StyleJSON);
//     });
//     it("has geometry_type attribute", function () {
//       expect(dataSource.hasOwnProperty("_geometry_type")).toBe(true);
//     });

//     it("geometry_type attribute has getter", function () {
//       expect(dataSource.geometry_type).toBe("polygon");
//     });

//     it("geometry_type attribute is standardized", function () {
//       expect(dataSource._geometry_type).toBe("polygon");
//     });

//     it("has tilejson_url attribute", function () {
//       expect(dataSource.hasOwnProperty("_tilejson_url")).toBe(true);
//     });

//     it("tilejson_url attribute is set with correct value", function () {
//       expect(dataSource._tilejson_url).toBe(tilejson_url);
//     });

//     it("tilejson_url attribute has getter", function () {
//       expect(dataSource.tilejson_url).toBe(tilejson_url);
//     });

//     it("has source_id attribute", function () {
//       expect(dataSource.hasOwnProperty("_source_id")).toBe(true);
//     });

//     it("_source_id attribute is set with correct value", function () {
//       expect(dataSource._source_id).toBe(tilejson.vector_layers[0].id);
//     });

//     it("_source_id has a getter", function () {
//       expect(dataSource.source_id).toBe(tilejson.vector_layers[0].id);
//     });
//   });

//   describe("Initialize class with wrong input parameters", () => {
//     it("throws error if no input params are provided", function () {
//       expect(() => {
//         new GeoJSONFeatures();
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("throws error if only style is provided", function () {
//       expect(() => {
//         new GeoJSONFeatures(null, "test style");
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("throws error if only tilejson is provided", function () {
//       expect(() => {
//         new GeoJSONFeatures({ test: "tst" });
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("does not throw error if source_config param is provided", function () {
//       expect(() => {
//         new GeoJSONFeatures(null, null, null, "test style");
//       }).not.toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("does not throw error if tilejson_url, tilejson and stylename params are provided", function () {
//       expect(() => {
//         new GeoJSONFeatures(tilejson_url, "test", "test style", null);
//       }).not.toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });
//   });
