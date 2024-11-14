import StyleJSON from "../src/utils/datasources/StyleJSON.js";
// import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources.js";

describe("StyleJSON", function () {
  const stylejson = {
    version: 8,
    name: "runways",
    zoom: 10,
    center: [4.7242, 52.3275],
    sources: {
      runways: {
        type: "vector",
        tiles: [
          "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
        ],
      },
    },
    layers: [],
  };

  describe("Initialize class with stylejson", () => {
    let styleObject;

    beforeEach(() => {
      styleObject = new StyleJSON(null, null, null, stylejson);
    });

    it("instance of StyleJSON is created", function () {
      expect(styleObject).toBeInstanceOf(StyleJSON);
    });

    it("style name is defined", function () {
      expect(styleObject.name).toBe(stylejson.name);
    });

    it("has sources attribute", function () {
      expect(styleObject.sources).not.toBeUndefined();
    });

    it("correct number of sources are created", function () {
      let originalSourceCount = Object.keys(stylejson.sources).length;
      let instanceSourceCount = Object.keys(styleObject.sources).length;

      expect(instanceSourceCount).toBe(originalSourceCount);
    });
  });

  describe("Create vectortile stylejson", () => {
    let styleObject;

    beforeEach(() => {
      styleObject = new StyleJSON(null, null, null, stylejson);
    });

    // it("source has a type attribute", function () {
    //   let source_id = Object.keys(styleObject.sources)[0];

    //   let has_attribute = styleObject.sources[source_id].hasOwnProperty("type");

    //   expect(has_attribute).toBe(true);
    // });

    // it("source type to be 'vector'", function () {
    //   let source_id = Object.keys(stylejson.sources)[0].type;
    //   let key = Object.keys(styleObject.sources)[0].type;

    //   expect(key).toBe(source_id);
    // });
    it("source has a tiles attribute", function () {
      let source_id = Object.keys(styleObject.sources)[0];

      let has_attribute =
        styleObject.sources[source_id].hasOwnProperty("tiles");

      expect(has_attribute).toBe(true);
    });
    it("tiles to be an array with length 1", function () {
      let source_id = Object.keys(styleObject.sources)[0];

      let tiles_length = styleObject.sources[source_id].tiles.length;

      expect(tiles_length).toBe(1);
    });
  });

  describe("Initialize class with stylename, tilejson and geometry type", () => {
    let styleObject;
    let tilejson = {
      tilejson: "3.0.0",
      tiles: [
        "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
      ],
      vector_layers: [
        {
          id: "runways",
          fields: {
            id: "Integer",
            fid: "Integer",
            name: "String",
            ref: "String",
            width: "String",
          },
          description: "",
          maxzoom: 15,
          minzoom: 3,
          geometry_type: "polygons",
        },
      ],
      bounds: [4.7079566, 52.2875942, 4.8035125, 52.3626997],
      center: [4.75573455, 52.325146950000004, 0],
      maxzoom: 15,
      minzoom: 3,
      name: "approach-altitude",
    };

    let input_stylename = "test";

    beforeEach(() => {
      styleObject = new StyleJSON(input_stylename, tilejson, "polygon");
    });

    it("throws error if insufficient params are provided", function () {
      expect(() => {
        new StyleJSON("test", {});
      }).toThrow(
        "Insufficient parameters provided for StyleJSON initialization."
      );
    });

    it("instance of StyleJSON is created", function () {
      expect(styleObject).toBeInstanceOf(StyleJSON);
    });

    it("style name is set correctly", function () {
      expect(styleObject.name).toBe(input_stylename);
    });
  });

  describe("Method tests", () => {
    const style = new StyleJSON(null, null, null, stylejson);

    it("getStyleAsObject returns correct structure", function () {
      let styleObject = style.getStyleAsObject();

      expect(styleObject).toEqual(stylejson);
    });

    it("addSource() returns valid structure when adding new source to existing source", function () {
      let new_source = {
        osm: {
          type: "vector",
          tiles: [
            "http://localhost:7080/rest/services/approach-altitude/collections/osm/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
          ],
        },
      };

      style.addSource(new_source);

      let styleObject = style.getStyleAsObject();

      stylejson.sources["osm"] = new_source.osm;

      expect(styleObject).toEqual(stylejson);
    });

    it("getstyleAsJSON() adds 'source-layer': <source_id> to each layer", function () {
      let json = JSON.parse(style.getStyleAsJSON());
      let source_id = Object.keys(json.sources)[0];
      let has_source_layers_defined = json.layers.every(
        (layer) => layer["source-layer"] === source_id
      );

      expect(has_source_layers_defined).toBe(true);
    });
  });
});
