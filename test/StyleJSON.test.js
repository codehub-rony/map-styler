import StyleJSON from "../src/utils/datasources/StyleJSON.js";
import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources.js";

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
    const styleObject = new StyleJSON(stylejson);

    it("style name is defined", function () {
      expect(styleObject.name).not.toBeUndefined();
    });

    it("style name is set correctly", function () {
      expect(styleObject.name).toBe(stylejson.name);
    });

    it("has sources attribute", function () {
      expect(styleObject.sources).not.toBeUndefined();
    });

    it("correct number of sources are added", function () {
      let originalSourceCount = Object.keys(stylejson.sources).length;
      let instanceSourceCount = Object.keys(styleObject.sources).length;

      expect(instanceSourceCount).toBe(originalSourceCount);
    });
  });

  describe("Initialize class without stylejson", () => {
    let styleObject;

    beforeEach(() => {
      styleObject = new StyleJSON();
    });

    it("instance of StyleJSON is created", function () {
      expect(styleObject).toBeInstanceOf(StyleJSON);
    });

    it("style name can be set", function () {
      let style_name = "airports";
      styleObject.name = style_name;
      expect(styleObject.name).toBe(style_name);
    });
  });

  describe("Method tests", () => {
    const style = new StyleJSON(stylejson);

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

    // it("style name is defined", function () {
    //   expect(styleObject.name).not.toBeUndefined();
    // });

    // it("style name is set correctly", function () {
    //   expect(styleObject.name).toBe(stylejson.name);
    // });

    // it("has sources attribute", function () {
    //   expect(styleObject.sources).not.toBeUndefined();
    // });

    // it("correct number of sources are added", function () {
    //   let originalSourceCount = Object.keys(stylejson.sources).length;
    //   let instanceSourceCount = styleObject.sources.length;

    //   expect(instanceSourceCount).toBe(originalSourceCount);
    // });

    // it("sources are of type TiledVectorSource", function () {
    //   const areAllSourcesTiledVectorSource = Object.values(
    //     styleObject.sources
    //   ).every((source) => source instanceof TiledVectorSource);

    //   expect(areAllSourcesTiledVectorSource).toBe(true);
    // });
  });
});
