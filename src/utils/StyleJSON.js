import FillLayer from "./FillLayer.js";
import LineLayer from "./LineLayer.js";
import CircleLayer from "./CircleLayer.js";

class BaseStyle {
  constructor(layer_name) {
    if (layer_name === undefined) {
      throw new Error("Name parameter is required");
    }
    this.version = 8;
    this.name = layer_name;
    this.sources = {};
    this.layers = [];
    this.geometry_type = null;
  }

  createDefaultLayers(geometry_type) {
    if (!geometry_type) {
      throw new Error("Style has no geometry_type");
    } else if (
      geometry_type === "Polygon" ||
      geometry_type === "MultiPolygon"
    ) {
      this.layers.push(new FillLayer(this.name));
      this.layers.push(new LineLayer(this.name));
    } else if (
      geometry_type === "LineString" ||
      geometry_type === "MultiLineString"
    ) {
      this.layers.push(new LineLayer(this.name));
    } else if (geometry_type === "Point") {
      this.layers.push(new CircleLayer(this.name));
    } else {
      throw new Error("Unkown geometry type from geoJSON");
    }
  }

  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.name,
      sources: this.sources,
      layers: this.layers.map((x) => x.getStyleAsObject()),
    };

    return JSON.stringify(style, null, 2);
  }
}

class GeojsonStyle extends BaseStyle {
  constructor(layer_name, geojson) {
    super(layer_name);
    this.initialize(geojson);
  }

  initialize(geojson) {
    this.sources[this.name] = { type: "geojson", data: "./data.geojson" };
    this.geojson = geojson;
  }
}

class VectorTileStyle extends BaseStyle {
  constructor(layer_name, tile_url) {
    super(layer_name);
    this.initialize(tile_url);
  }

  initialize(tile_url) {
    this.sources[this.name] = { type: "vector", tiles: [`${tile_url}`] };
  }
}

// const createStyleObject = function (geojson, data_source) {
// const createStyleObject = function (layer_name, data_source) {
//   if (data_source == "geojson") {
//     return new GeojsonStyle(layer_name);
//   } else if (data_source == "vector_tile") {
//     return new VectorTileStyle(layer_name);
//   }
// };

export default { GeojsonStyle, VectorTileStyle };
