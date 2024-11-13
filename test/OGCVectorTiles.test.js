import OGCVectorTiles from "../src/utils/datasources/OGCVectorTiles.js";
import StyleJSON from "../src/utils/datasources/StyleJSON.js";

describe("OGCVectorTiles", function () {
  describe("Initialize class without config", () => {
    let dataSource;

    beforeEach(() => {
      dataSource = new OGCVectorTiles();
    });

    it("instance of OGCVectorTiles is created", function () {
      expect(dataSource).toBeInstanceOf(OGCVectorTiles);
    });

    it("tilejson_url has getter and setter", function () {
      let url = "http://test.nl";
      dataSource.tilejson_url = url;
      expect(dataSource.tilejson_url).toBe(url);
    });

    it("initDefaultStyle populates stylejson attribute with istance of StyleJSON", function () {
      dataSource.label = "New style";
      dataSource.geometry_type = "polygon";
      dataSource.tilejson_url = "http://test.nl";
      dataSource.initDefaultStyle();

      expect(dataSource.stylejson).toBeInstanceOf(StyleJSON);
    });

    it("default stylejson has two layers for polygon geometry", function () {
      dataSource.label = "New style";
      dataSource.geometry_type = "polygon";
      dataSource.tilejson_url = "http://test.nl";
      dataSource.initDefaultStyle();

      expect(dataSource.stylejson.layers.length).toBe(2);
    });
  });
});
