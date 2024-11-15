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

  describe("Method tests", () => {
    const style = new StyleJSON(null, null, null, stylejson);

    it("getStyleAsObject returns correct structure", function () {
      let styleObject = style.getStyleAsObject();

      expect(styleObject).toEqual(stylejson);
    });
  });
});
