const StyleJSON = require("./StyleJSON");
const data = require("./demo_data");

describe("StyleJSON", () => {
  describe("create style", () => {
    it("returns correct object based on data_source type", () => {
      const style = StyleJSON.createStyleObject(data.asString(), "geojson");
      expect(style instanceof StyleJSON.GeojsonStyle).toBe(true);
    });

    it("throws error when data_source is invalid", () => {
      const init_style = () => {
        StyleJSON.createStyleObject("buildings", "shapefile");
      };

      expect(init_style).toThrow("Data source should be a geojson");
    });
  });

  describe("GeojsonStyle initilization", () => {
    const source_type = "geojson";
    const name = data.asObject().name;
    const geojsonAsText = data.asString();

    const style = StyleJSON.createStyleObject(geojsonAsText, source_type);

    it("creates a layer source with name from geojson name", () => {
      expect(style.sources.hasOwnProperty(name)).toBe(true);
    });

    it("source layer has type (with value geojson) and data attributes", () => {
      expect(style.sources[name].hasOwnProperty("type")).toBe(true);
      expect(style.sources[name].hasOwnProperty("data")).toBe(true);
      expect(style.sources[name].type).toBe(source_type);
    });

    it("parses geometry from json object", () => {
      const json = data.asObject();
      expect(style.parseGeometryFromFeature(json)).toBe("Polygon");
    });

    it("geometry_type of styleObject is set", () => {
      expect(style.geometry_type).toBe("Polygon");
    });
  });
});