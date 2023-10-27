import FillLayer from "./FillLayer.js";
import LineLayer from "./LineLayer.js";
import CircleLayer from "./CircleLayer.js";

class BaseStyle {
  constructor(style_name, source_id, geometry_type, source_type) {
    if (style_name === undefined) {
      throw new Error("Name parameter is required");
    }
    this.version = 8;
    this.style_name = style_name;
    this.source_id = source_id;
    this.source_type = source_type;
    this.sources = {};
    this.layers = [];
    this.geometry_type = geometry_type;
  }

  createDefaultLayers() {
    let polygon = ["polygon", "multipolygon", "polygons"];
    let line = ["linestring", "multilinestring"];
    if (!this.geometry_type) {
      throw new Error("Style has no geometry_type");
    } else if (polygon.includes(this.geometry_type)) {
      this.layers.push(new FillLayer(this.style_name, this.source_id));
      this.layers.push(new LineLayer(this.style_name, this.source_id));
    } else if (line.includes(this.geometry_type)) {
      this.layers.push(new LineLayer(this.style_name));
    } else if (this.geometry_type === "Point") {
      this.layers.push(new CircleLayer(this.style_name));
    } else {
      throw new Error("Unkown geometry type from geoJSON");
    }
  }
}

class GeojsonStyle extends BaseStyle {
  constructor(layer_name, source_id, geometry_type, geojson) {
    super(layer_name, source_id, geometry_type, "geojson");
    this.initialize(geojson);
  }

  initialize(geojson) {
    this.sources[this.source_id] = { type: "geojson", data: "./data.geojson" };
    this.geojson = geojson;
    this.createDefaultLayers();
  }

  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.style_name,
      sources: this.sources,
      layers: this.layers.map((x) => x.getStyleAsObject()),
    };

    style.layers.forEach((layer) => {
      layer["layer"] = this.source_id;
    });

    return JSON.stringify(style, null, 2);
  }
}

class OGCTileStyle extends BaseStyle {
  constructor(style_name, tilejson_url, source_id, geometry_type, tiles_url) {
    super(style_name, source_id, geometry_type, "ogc_vector_tile");
    this.tilejson_url = tilejson_url;
    this.tiles_url = tiles_url;
    this.vector_layer = null;

    this.init();
  }

  init() {
    this.sources[this.source_id] = { type: "vector", tiles: [this.tiles_url] };
    this.createDefaultLayers();
  }
  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.style_name,
      sources: this.sources,
      layers: this.layers.map((x) => x.getStyleAsObject()),
    };

    style.layers.forEach((layer) => {
      layer["source-layer"] = this.source_id;
      layer["layout"] = {};
      layer.layout["visibility"] = "visible";
    });

    return JSON.stringify(style, null, 2);
  }
}

export default { GeojsonStyle, OGCTileStyle };
