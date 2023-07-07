import FillLayer from "./FillLayer.js";
import LineLayer from "./LineLayer.js";
import CircleLayer from "./CircleLayer.js";

class BaseStyle {
  constructor(name) {
    if (name === undefined) {
      throw new Error("Name parameter is required");
    }
    this.version = 8;
    this.name = name;
    this.features = null;
    this.sources = {};
    this.layers = [];
    this.geometry_type = null;
  }

  createDefaultLayers() {
    if (!this.geometry_type) {
      throw new Error("Style has no geometry_type");
    } else if (
      this.geometry_type === "Polygon" ||
      this.geometry_type === "MultiPolygon"
    ) {
      this.layers.push(new FillLayer(this.name));
      this.layers.push(new LineLayer(this.name));
    } else if (
      this.geometry_type === "Line" ||
      this.geometry_type === "MultiLine"
    ) {
      this.layers.push(new LineLayer(this.name));
    } else if (this.geometry_type === "Point") {
      this.layers.push(new CircleLayer(this.name));
    } else {
      throw new Error("Couldn't parse geometry type from geoJSON");
    }
  }

  updatePaint(layer_id, attribute, value) {
    this.layers.forEach((layer) => {
      if (layer.id === layer_id) {
        layer.paint[attribute] = value;
      }
    });
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
  constructor(geojson) {
    super(geojson.name);
    this.initialize(geojson);
  }

  initialize(geojson) {
    this.features = geojson.features;
    this.sources[this.name] = { type: "geojson", data: "./data.geojson" };
    this.geometry_type = this.parseGeometryFromFeature(geojson);
    this.createDefaultLayers();
  }

  parseGeometryFromFeature(geojson) {
    return geojson.features[0].geometry.type;
  }
}

const createStyleObject = function (geojson, data_source) {
  if (data_source == "geojson") {
    return new GeojsonStyle(geojson, "geojson");
  }
};

export default {
  BaseStyle,
  GeojsonStyle,
  createStyleObject,
};
