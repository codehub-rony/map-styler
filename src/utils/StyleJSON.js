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
      this.createFillLayer();
      this.createLineLayer();
    } else if (
      this.geometry_type === "Line" ||
      this.geometry_type === "MultiLine"
    ) {
      this.createLineLayer();
    } else {
      throw new Error("Couldn't parse geometry type from geoJSON");
    }
  }

  createFillLayer() {
    this.layers.push({
      id: `${this.name}_fill`,
      source: this.name,
      type: "fill",
      paint: { color: { r: 232, g: 227, b: 223, a: 0.7 } },
    });
  }

  createLineLayer() {
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

  updatePaint(layer_id, attribute, value) {
    this.layers.forEach((layer) => {
      if (layer.id === layer_id) {
        layer.paint[attribute] = value;
      }
    });
  }
  rgbaToPaint = function (color) {
    if (color) {
      return {
        color: `rgb(${color.r}, ${color.g}, ${color.b})`,
        opacity: color.a,
      };
    }
  };

  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.name,
      sources: this.sources,
      layers: this.layers,
    };

    let style_json = JSON.parse(JSON.stringify(style));
    style_json.layers.forEach((layer, i) => {
      if (layer.type == "fill" || layer.type == "line") {
        let rgb = this.rgbaToPaint(layer.paint.color);
        delete Object.assign(layer.paint, {
          [`${layer.type}-color`]: layer.paint["color"],
        })["color"];

        layer.paint[`${layer.type}-color`] = rgb.color;
        layer.paint[`${layer.type}-opacity`] = rgb.opacity;
      }
    });
    return JSON.stringify(style_json, null, 2);
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
