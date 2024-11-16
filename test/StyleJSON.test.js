import StyleJSON from "../src/utils/datasources/StyleJSON.js";
import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources";
import FillLayer from "../src/utils/stylejson/layers/FillLayer.js";

describe("StyleJSON", function () {
  const stylejson = {
    version: 8,
    name: "test style",
    center: [4.7242, 52.3275],
    sources: {
      runways: {
        type: "vector",
        tiles: [
          "http://localhost:7080/rest/services/<service_id>/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
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
    let styleObject;

    beforeEach(() => {
      let style_name = stylejson.name;
      let tiles_url =
        "http://localhost:7080/rest/services/<service_id>/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt";
      let source_id = "runways";
      let geometry_type = "polygon";
      let source = new TiledVectorSource(source_id, tiles_url, geometry_type);
      styleObject = new StyleJSON(style_name, source, geometry_type, null);
    });

    it("getStyleAsObject returns object", function () {
      let styleAsObject = styleObject.getStyleAsObject();

      expect(styleAsObject).toBeInstanceOf(Object);
    });

    it("DeleteLayer removes correct layer", function () {
      let id_to_remove = styleObject.layers[0].id;

      styleObject.deleteLayer(id_to_remove);

      let remaing_ids = styleObject.layers.map((x) => x.id);
      console.log(styleObject.layers);
      expect(remaing_ids.includes(id_to_remove)).toBe(false);
    });

    it("CreateLayer with geometry type polygon returns a new layer with FillLayer as instances type", function () {
      let source_id = "runways";
      let new_layer = styleObject.createLayer(source_id, "polygon");

      expect(new_layer).toBeInstanceOf(FillLayer);
    });

    it("AddLayer adds new layer to array of layers", function () {
      let source_id = "runways";
      let new_layer = styleObject.createLayer(source_id, "polygon");
      styleObject.addLayer(new_layer);

      expect(styleObject.layers.includes(new_layer)).toBe(true);
    });
  });
});
