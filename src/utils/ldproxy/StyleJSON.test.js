import StyleJSON from "./StyleJSON.js";
const data = require("./demo_data");

jest.mock("./StyleJSON");

beforeEach(() => {
  StyleJSON.mockClear();
});

describe("StyleJSON", () => {
  describe("create style", () => {
    it("returns correct object based on data_source type", () => {
      const style = StyleJSON.createStyleObject(data.asString(), "geojson");
      expect(style instanceof StyleJSON.GeojsonStyle).toBe(true);
    });
  });
});

describe("BaseStyle", () => {
  describe("initialization", () => {
    it("throws error if name parameter is undefined", () => {
      const create_base_style = () => {
        base_style = new StyleJSON.BaseStyle();
      };

      expect(create_base_style).toThrow("Name parameter is required");
    });
  });
  describe("createDefaultLayers", () => {
    it("throws an error if geometry_type is not set", () => {
      const base_style = new StyleJSON.BaseStyle("buildings");
      const init_layers = () => {
        base_style.createDefaultLayers();
      };
      expect(init_layers).toThrow("Style has no geometry_type");
    });

    it("polygon geometry only has line and fill layers", () => {
      const base_style = new StyleJSON.BaseStyle("buildings");
      base_style.geometry_type = "Polygon";
      base_style.createDefaultLayers();

      let created_layers = [];

      base_style.layers.forEach((layer) => {
        created_layers.push(layer.type);
      });

      expect(created_layers.sort()).toEqual(["fill", "line"].sort());
    });
    it("line geometry only has line layer", () => {
      const base_style = new StyleJSON.BaseStyle("buildings");
      base_style.geometry_type = "Line";
      base_style.createDefaultLayers();

      let created_layers = [];

      base_style.layers.forEach((layer) => {
        created_layers.push(layer.type);
      });

      expect(created_layers.sort()).toEqual(["line"].sort());
    });
  });
  describe("functions", () => {
    let name = "buildings";
    const layer_id = `${name}_border`;

    const create_base_style = function (source_name) {
      const base_style = new StyleJSON.BaseStyle(source_name);
      base_style.geometry_type = "Polygon";
      base_style.createDefaultLayers();
      return base_style;
    };
    it("updates line-color aittribute based on layer id", () => {
      const base_style = create_base_style(name);

      const targetKey = "line-color";
      const targetValue = "rgb(10, 10, 10)";

      base_style.updatePaint(layer_id, targetKey, targetValue);

      let expected_paint_after_update = {
        "line-color": targetValue,
        "line-width": 1,
        "line-opacity": 1,
      };

      base_style.layers.forEach((layer) => {
        if (layer.id === layer_id) {
          expect(layer.paint).toEqual(expected_paint_after_update);
        }
      });
    });
    it("updates line-width aittribute based on layer id", () => {
      const base_style = create_base_style(name);
      const targetKey = "line-width";
      const targetValue = 3;

      base_style.updatePaint(layer_id, targetKey, targetValue);

      let expected_paint_after_update = {
        "line-color": "rgb(54, 154, 204)",
        "line-width": targetValue,
        "line-opacity": 1,
      };

      base_style.layers.forEach((layer) => {
        if (layer.id === layer_id) {
          expect(layer.paint).toEqual(expected_paint_after_update);
        }
      });
    });
    it("getStyleAsJSON returns a valid json", () => {
      const base_style = create_base_style(name);

      let style = base_style.getStyleAsJSON();
      const parse_json = () => {
        JSON.parse(style);
      };

      expect(parse_json).not.toThrow();
    });
  });
});

describe("GeojsonStyle", () => {
  const source_type = "geojson";
  const name = data.asObject().name;
  const geojsonAsText = data.asObject();

  const style = StyleJSON.createStyleObject(geojsonAsText, source_type);

  it("source definition is set", () => {
    expect(style.sources[name].hasOwnProperty("type")).toBe(true);
    expect(style.sources[name].hasOwnProperty("data")).toBe(true);
    expect(style.sources[name].type).toBe(source_type);
  });

  it("geometry is parsed from geojson object", () => {
    const json = data.asObject();
    expect(style.parseGeometryFromFeature(json)).toBe("Polygon");
  });

  it("geometry_type is set", () => {
    expect(style.geometry_type).toBe("Polygon");
  });
  it("features are set", () => {
    expect(style.features.length).toEqual(data.asObject().features.length);
  });
});
