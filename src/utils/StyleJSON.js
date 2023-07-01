class BaseStyle {
  constructor(name) {
    if (name === undefined) {
      throw new Error("Name parameter is required");
    }
    this.version = 8;
    this.name = name;
    this.data_source = null;
    this.layers = [];
    this.geometry_type = null;
  }

  createDefaultLayers() {
    if (!this.geometry_type) {
      throw new Error("Style has no geometry_type");
    }
    if (this.geometry_type == "Polygon") {
      this.createFillLayer();
      this.createLineLayer();
    }
    if (this.geometry_type == "Line") {
      this.createLineLayer();
    }
  }

  createFillLayer() {
    this.layers.push({
      id: `${this.name}_fill`,
      source: this.name,
      type: "fill",
      paint: { "fill-color": "rgb(232,227,223)", "fill-opaciy": 0.7 },
    });
  }

  createLineLayer() {
    this.layers.push({
      id: `${this.name}_border`,
      source: this.name,
      type: "line",
      paint: {
        "line-color": "rgb(54, 154, 204)",
        "line-width": 1,
        "line-opacity": 1,
      },
    });
  }

  updatePaint(layer_id, targetKey, targetValue) {
    this.layers.forEach((layer) => {
      if (layer.id === layer_id) {
        layer.paint[targetKey] = targetValue;
      }
    });
  }
}

class GeojsonStyle extends BaseStyle {
  constructor(geojson, data_source) {
    super(data_source);
    this.sources = {};
    this.initialize(geojson, data_source);
  }

  initialize(geojson, data_source) {
    let json = JSON.parse(geojson);

    this.sources[json.name] = { type: data_source, data: null };
    this.geometry_type = this.parseGeometryFromFeature(json);
  }

  parseGeometryFromFeature(geojson) {
    return geojson.features[0].geometry.type;
  }
}

const createStyleObject = function (geojson, data_source) {
  if (data_source == "geojson") {
    return new GeojsonStyle(geojson, data_source);
  }
};

module.exports = {
  BaseStyle,
  GeojsonStyle,
  createStyleObject,
};

// let layername = properties.file.name.split(".")[0];
// let root = {};
// // root["version"] = 8;
// // root["name"] = layername;

// root["sources"][layername] = {
//   type: properties.file.name.split(".")[1],
//   data: `./${properties.file.name}`,
// };
// // root["layers"] = null;
