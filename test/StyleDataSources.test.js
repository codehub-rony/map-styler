import StyleJSON from "../src/utils/datasources/StyleJSON.js";
import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources.js";

describe("StyleJSON", function () {
  const stylejson = {
    version: 8,
    center: [4.7242, 52.3275],
    name: "runways",
    sources: {
      runways: {
        type: "vector",
        tiles: [
          "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
        ],
      },
    },
  };
  describe("Initialize class", () => {
    let source_id = Object.keys(stylejson.sources)[0];
    let tiles_url = stylejson.sources[source_id].tiles[0];
    console.log(source_id, tiles_url);
    const vectorSource = new TiledVectorSource(source_id, tiles_url);

    it("style name is defined", function () {
      expect(vectorSource._tiles[0]).toBe(tiles_url);
    });

    it("getStyleObject method returns object", function () {
      let styleObject = vectorSource.getStyleAsObject();

      expect(styleObject).toBeInstanceOf(Object);
    });

    it("getStyleAsObject returns correct structure", function () {
      let styleObject = vectorSource.getStyleAsObject();
      expect(styleObject).toEqual(stylejson.sources);
    });
  });
});
