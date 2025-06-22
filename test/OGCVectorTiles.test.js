// import OGCVectorTiles from "../src/utils/datasources/OGCVectorTiles.js";
// import StyleJSON from "../src/utils/datasources/StyleJSON.js";

// describe("OGCVectorTiles", function () {
//   describe("Initialize class with wrong input parameters", () => {
//     it("throws error if no input params are provided", function () {
//       expect(() => {
//         new OGCVectorTiles();
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("throws error if only style is provided", function () {
//       expect(() => {
//         new OGCVectorTiles(null, "test style");
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("throws error if only tilejson is provided", function () {
//       expect(() => {
//         new OGCVectorTiles({ test: "tst" });
//       }).toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("does not throw error if source_config param is provided", function () {
//       expect(() => {
//         new OGCVectorTiles(null, null, null, "test style");
//       }).not.toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });

//     it("does not throw error if tilejson_url, tilejson and stylename params are provided", function () {
//       expect(() => {
//         new OGCVectorTiles(tilejson_url, "test", "test style", null);
//       }).not.toThrow(
//         "Insufficient parameters provided for OGCVectorTiles initialization."
//       );
//     });
//   });

//   describe("Initiate defaultstyle using tilejson", () => {
//     let dataSource;
//     let tilejson = {
//       tilejson: "3.0.0",
//       tiles: [
//         "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
//       ],
//       vector_layers: [
//         {
//           id: "runways",
//           fields: {
//             id: "Integer",
//             fid: "Integer",
//             name: "String",
//             ref: "String",
//             width: "String",
//           },
//           description: "",
//           maxzoom: 15,
//           minzoom: 3,
//           geometry_type: "polygons",
//         },
//       ],
//       bounds: [4.7079566, 52.2875942, 4.8035125, 52.3626997],
//       center: [4.75573455, 52.325146950000004, 0],
//       maxzoom: 15,
//       minzoom: 3,
//       name: "approach-altitude",
//     };

//     let tilejson_url =
//       "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad";
//     beforeEach(() => {
//       let stylename = "test style";
//       dataSource = new OGCVectorTiles(tilejson_url, tilejson, stylename);
//     });

//     it("instance of OGCVectorTiles is created", function () {
//       expect(dataSource).toBeInstanceOf(OGCVectorTiles);
//     });

//     it("instance of StyleJSON is created", function () {
//       expect(dataSource.stylejson).toBeInstanceOf(StyleJSON);
//     });

//     it("geometry_type attribute is set correctly (not empty and standarized)", function () {
//       expect(dataSource.geometry_type).toBe("polygon");
//     });

//     it("fields are parsed from tilejson and set to fields attribute", function () {
//       let original_fields = tilejson.vector_layers[0].fields;

//       expect(dataSource.fields).toEqual(original_fields);
//     });

//     it("tilejson_url attribute is set with correct value and has getter", function () {
//       expect(dataSource.tilejson_url).toBe(tilejson_url);
//     });

//     it("_source_id attribute is set with correct value and has getter", function () {
//       expect(dataSource.source_id).toBe(tilejson.vector_layers[0].id);
//     });

//     it("style_name attribute is set with correct value and has getter", function () {
//       let stylename = "test style";
//       expect(dataSource.style_name).toBe(stylename);
//     });

//     // it("getstyleAsJSON() adds 'source-layer': <source_id> to each layer", function () {
//     //   let json = JSON.parse(style.getStyleAsJSON());
//     //   let source_id = Object.keys(json.sources)[0];
//     //   let has_source_layers_defined = json.layers.every(
//     //     (layer) => layer["source-layer"] === source_id
//     //   );

//     //   expect(has_source_layers_defined).toBe(true);
//     // });
//     // it("addSource() returns valid structure when adding new source to existing source", function () {
//     //   let new_source = {
//     //     osm: {
//     //       type: "vector",
//     //       tiles: [
//     //         "http://localhost:7080/rest/services/approach-altitude/collections/osm/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
//     //       ],
//     //     },
//     //   };

//     //   style.addSource(new_source);

//     //   let styleObject = style.getStyleAsObject();

//     //   stylejson.sources["osm"] = new_source.osm;

//     //   expect(styleObject).toEqual(stylejson);
//     // });
//     // describe("Method tests", () => {
//     //   const style = new StyleJSON(null, null, null, stylejson);

//     //   it("getStyleAsObject returns correct structure", function () {
//     //     let styleObject = style.getStyleAsObject();

//     //     expect(styleObject).toEqual(stylejson);
//     //   });
//     // });
//   });
// });
