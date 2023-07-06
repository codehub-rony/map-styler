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
    } else if (this.geometry_type === "Point") {
      this.createCircleLayer();
    } else {
      throw new Error("Couldn't parse geometry type from geoJSON");
    }
  }

  createFillLayer() {
    this.layers.push({
      id: `${this.name}_fill`,
      source: this.name,
      type: "fill",
      // paint: { color: { r: 232, g: 227, b: 223, a: 0.7 } },
      paint: [
        {
          attribute: "fill-color",
          type: "color",
          value: { r: 232, g: 227, b: 223, a: 0.7 },
        },
      ],
    });
  }

  createLineLayer() {
    this.layers.push({
      id: `${this.name}_border`,
      source: this.name,
      type: "line",
      // paint: {
      //   color: { r: 54, g: 154, b: 204, a: 1 },
      //   "line-width": 1,
      // },
      paint: [
        {
          attribute: "line-color",
          type: "color",
          value: { r: 54, g: 154, b: 204, a: 1 },
        },
        { attribute: "line-width", value: 1, type: "integer" },
      ],
    });
  }

  createCircleLayer() {
    this.layers.push({
      id: `${this.name}_circle`,
      source: this.name,
      type: "circle",
      // paint: {
      //   color: { r: 255, g: 255, b: 255, a: 0.5 },
      //   "circle-stroke-width": 1,
      //   "circle-radius": 3,
      //   // "circle-stroke-color": { r: 54, g: 154, b: 204, a: 1 },
      // },
      paint: [
        {
          attribute: "circle-color",
          type: "color",
          value: { r: 255, g: 255, b: 255, a: 0.5 },
        },
        { attribute: "circle-stroke-width", type: "integer", value: 1 },
        { attribute: "circle-radius", type: "integer", value: 3 },
        {
          attribute: "circle-stroke-color",
          type: "color",
          value: { r: 54, g: 154, b: 204, a: 1 },
        },
      ],
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
  transformColorToRGB = function (color) {
    let result = {};
    let category = color.attribute.slice(0, color.attribute.lastIndexOf("-"));
    result[
      color.attribute
    ] = `rgb(${color.value.r}, ${color.value.g}, ${color.value.b})`;
    result[`${category}-opacity`] = color.value.a;

    return result;
  };

  transformAttributes = function (paint) {
    let obj = {};
    paint.forEach((property) => {
      if (property.type === "color") {
        let category = property.attribute.slice(
          0,
          property.attribute.lastIndexOf("-")
        );
        obj[
          property.attribute
        ] = `rgb(${property.value.r}, ${property.value.g}, ${property.value.b})`;
        obj[`${category}-opacity`] = property.value.a;
      } else {
        obj[property.attribute] = property.value;
      }
    });
    return obj;

    // return paint.map((a) => {
    //   let obj = {};
    //   let color_attributes;

    //   if (a.type === "color") {
    //     let category = a.attribute.slice(0, a.attribute.lastIndexOf("-"));
    //     color_attributes[
    //       a.attribute
    //     ] = `rgb(${a.value.r}, ${a.value.g}, ${a.value.b})`;
    //     color_attributes[`${category}-opacity`] = a.value.a;
    //   } else {
    //     obj[a.attribute] = a.value;
    //   }

    //   return Object.assign({}, obj, color_attributes);
    // });
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
      layer["new_paint"] = this.transformAttributes(layer.paint);
      layer["paint"] = layer["new_paint"];
      delete layer.new_paint;
    });

    console.log(style_json);
    return JSON.stringify(style_json, null, 2);
  }

  // getStyleAsJSON() {
  //   let style = {
  //     version: this.version,
  //     name: this.name,
  //     sources: this.sources,
  //     layers: this.layers,
  //   };

  //   let style_json = JSON.parse(JSON.stringify(style));
  //   style_json.layers.forEach((layer, i) => {
  //     if (layer.type == "fill" || layer.type == "line") {
  //       let rgb = this.rgbaToPaint(layer.paint.color);
  //       delete Object.assign(layer.paint, {
  //         [`${layer.type}-color`]: layer.paint["color"],
  //       })["color"];

  //       layer.paint[`${layer.type}-color`] = rgb.color;
  //       layer.paint[`${layer.type}-opacity`] = rgb.opacity;
  //     }
  //     if (layer.type == "circle") {
  //       let rgb = this.rgbaToPaint(layer.paint.color);
  //       delete Object.assign(layer.paint, {
  //         [`${layer.type}-color`]: layer.paint["color"],
  //       })["color"];

  //       layer.paint[`${layer.type}-color`] = rgb.color;
  //       layer.paint[`${layer.type}-opacity`] = rgb.opacity;
  //     }
  //   });
  //   return JSON.stringify(style_json, null, 2);
  // }
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
