class BaseStyle {
  constructor(name, data_source, geom_type) {
    this.version = 8;
    this.name = name;
    this.data_source = data_source;
    this.layers = [];
    this.geom_type = null;
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
    // type: this.data_source, data:
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
