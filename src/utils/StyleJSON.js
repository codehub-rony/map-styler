class BaseStyle {
  constructor() {
    this.version = 8;
    this.name = null;
    this.data_source = null;
    this.layers = [];
    this.geometry_type = null;
  }

  create_default_layers() {
    if (!this.geometry_type) {
      throw new Error("Style has no geometry_type");
    }
    if (this.geometry_type == "Polygon") {
      this.create_fill_layer();
      this.create_line_layer();
    }
    if (this.geometry_type == "Line") {
      this.create_line_layer();
    }
  }

  create_fill_layer() {
    this.layers.push({
      id: `${this.name}_fill`,
      source: this.name,
      type: "fill",
      paint: { color: { r: 232, g: 227, b: 223, a: 0.7 } },
    });
  }

  create_line_layer() {
    this.layers.push({
      id: `${this.name}_border`,
      source: this.name,
      type: "line",
      paint: {
        color: { r: 54, g: 154, b: 204, a: 1 },
        "line-width": 1,
      },
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
  } else {
    throw new Error("Data source should be a geojson");
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
