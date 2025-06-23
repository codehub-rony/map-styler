import StyleJSON from "../src/utils/datasources/StyleJSON.js";
import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources";
import FillLayer from "../src/utils/stylejson/layers/FillLayer.js";

describe("StyleJSON", function () {
  describe("Initialize class with stylejson", () => {
    const stylejson = {
      version: 8,
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
    let styleObject;

    beforeEach(() => {
      styleObject = new StyleJSON(null, null, null, stylejson);
    });

    it("instance of StyleJSON is created", function () {
      expect(styleObject).toBeInstanceOf(StyleJSON);
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

  describe("Initialize class without stylejson", () => {
    let styleObject;
    let stylename = "test name";
    let source = new TiledVectorSource("airports", "https://example_url");
    let geometry_type = "polygon";

    beforeEach(() => {
      styleObject = new StyleJSON(stylename, source, geometry_type, null);
    });

    it("instance of StyleJSON is created", function () {
      expect(styleObject).toBeInstanceOf(StyleJSON);
    });

    it("Sources attribute to have one source", function () {
      expect(Object.keys(styleObject.sources)).toHaveLength(1);
    });

    it("Source to be instance of ", function () {
      let expected_source_format = {
        airports: { type: "vector", tiles: ["https://example_url"] },
      };
      expect(styleObject.sources).toStrictEqual(expected_source_format);
    });

    // it("Source to be instance of TiledVectorSource", function () {

    //   expect(ObjectstyleObject.sources).toStrictEqual(expected_source_format);
    // });
  });

  describe("Methods", () => {
    // let styleObject;
    // beforeEach(() => {
    //   let style_name = stylejson.name;
    //   let tiles_url =
    //     "http://localhost:7080/rest/services/<service_id>/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt";
    //   let source_id = "runways";
    //   let geometry_type = "polygon";
    //   let source = new TiledVectorSource(source_id, tiles_url, geometry_type);
    //   styleObject = new StyleJSON(style_name, source, geometry_type, null);
    // });
    //     it("getStyleAsObject returns object", function () {
    //       let styleAsObject = styleObject.getStyleAsObject();
    //       expect(styleAsObject).toBeInstanceOf(Object);
    //     });
    //     it("DeleteLayer removes correct layer", function () {
    //       let id_to_remove = styleObject.layers[0].id;
    //       styleObject.deleteLayer(id_to_remove);
    //       let remaing_ids = styleObject.layers.map((x) => x.id);
    //       console.log(styleObject.layers);
    //       expect(remaing_ids.includes(id_to_remove)).toBe(false);
    //     });
    //     it("CreateLayer with geometry type polygon returns a new layer with FillLayer as instances type", function () {
    //       let source_id = "runways";
    //       let new_layer = styleObject.createLayer(source_id, "polygon");
    //       expect(new_layer).toBeInstanceOf(FillLayer);
    //     });
    //     it("AddLayer adds new layer to array of layers", function () {
    //       let source_id = "runways";
    //       let new_layer = styleObject.createLayer(source_id, "polygon");
    //       styleObject.addLayer(new_layer);
    //       expect(styleObject.layers.includes(new_layer)).toBe(true);
    //     });
  });
  describe("Methods with new stylejosn", () => {
    let styleObject;
    let stylename = "test name";
    let source = new TiledVectorSource("airports", "https://example_url");
    let geometry_type = "polygon";

    beforeEach(() => {
      styleObject = new StyleJSON(stylename, source, geometry_type, null);
    });

    describe("getStyleJSON", () => {
      let styleObject;
      let stylename = "test name";
      let source = new TiledVectorSource("airports", "https://example_url");
      let geometry_type = "polygon";
      let stylejson;

      beforeEach(() => {
        styleObject = new StyleJSON(stylename, source, geometry_type, null);
        stylejson = styleObject.getStyleJSON();
      });

      it("stylejson.version is defined", () => {
        expect(stylejson.version).toEqual(styleObject.version);
      });

      it("stylejson.zoom is defined", () => {
        expect(Number.isInteger(stylejson.zoom)).toBe(true);
      });

      it("stylejson.center  is defined", () => {
        expect(stylejson.center).toStrictEqual([0, 0]);
      });

      it("stylejson to have 2 layers defineded", () => {
        expect(stylejson.layers).toHaveLength(2);
      });
    });

    describe("createLayer", () => {
      let styleObject;
      let stylename = "test name";
      let source = new TiledVectorSource("airports", "https://example_url");
      let geometry_type = "polygon";
      let stylejson;

      beforeEach(() => {
        styleObject = new StyleJSON(stylename, source, geometry_type, null);
        stylejson = styleObject.getStyleJSON();
      });

      it("Throws error if layer label is not provided", () => {
        expect(stylejson.version).toEqual(styleObject.version);
      });

      //   it("stylejson.zoom is defined", () => {
      //     expect(Number.isInteger(stylejson.zoom)).toBe(true);
      //   });

      //   it("stylejson.center  is defined", () => {
      //     expect(stylejson.center).toStrictEqual([0, 0]);
      //   });

      //   it("stylejson to have 2 layers defineded", () => {
      //     expect(stylejson.layers).toHaveLength(2);
      //   });
    });
    //     it("CreateLayer with geometry type polygon returns a new layer with FillLayer as instances type", function () {
    //       let source_id = "runways";
    //       let new_layer = styleObject.createLayer(source_id, "polygon");
    //       expect(new_layer).toBeInstanceOf(FillLayer);
    //     });
  });
});
