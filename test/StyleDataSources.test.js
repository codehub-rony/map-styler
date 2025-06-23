// import { TiledVectorSource } from "../src/utils/datasources/StyleDataSources.js";

// describe("StyleJSON", function () {
//   describe("Initialize class", () => {
//     const stylejson = {
//       version: 8,
//       center: [4.7242, 52.3275],
//       name: "runways",
//       sources: {
//         runways: {
//           type: "vector",
//           tiles: [
//             "http://localhost:7080/rest/services/approach-altitude/collections/runways/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt",
//           ],
//         },
//       },
//     };
//     let vectorSource;

//     let source_id = Object.keys(stylejson.sources)[0];
//     let tiles_url = stylejson.sources[source_id].tiles[0];

//     beforeEach(() => {
//       vectorSource = new TiledVectorSource(source_id, tiles_url);
//     });

//     it("instance of vectorSource is created", function () {
//       expect(vectorSource).toBeInstanceOf(TiledVectorSource);
//     });

//     it("id to be set correctly", function () {
//       let source_id = Object.keys(stylejson.sources)[0];
//       expect(vectorSource.id).toBe(source_id);
//     });

//     it("type to be 'vector'", function () {
//       let source_id = Object.keys(stylejson.sources)[0];
//       stylejson.sources[source_id].type;

//       expect(vectorSource._type).toBe(stylejson.sources[source_id].type);
//     });

//     it("tiles to have the correct number of items", function () {
//       let source_id = Object.keys(stylejson.sources)[0];
//       let originalLength = stylejson.sources[source_id].tiles.length;
//       let tiles_length = vectorSource._tiles.length;

//       expect(tiles_length).toBe(originalLength);
//     });
//     it("getSourceAsObject() returns valid sources object", function () {
//       expect(vectorSource.getSourceAsObject()).toEqual(stylejson.sources);
//     });
//   });
// });
