import { Point, LineString, Polygon, MultiPolygon } from "ol/geom.js";
const rgbaToPaint = function (color) {
  if (color) {
    return {
      color: `rgb(${color.r}, ${color.g}, ${color.b})`,
      opacity: color.a,
    };
  }
};

const paintToColorObject = function (paint) {
  let color_object;

  for (const [key, value] of Object.entries(paint)) {
    if (key.includes("color")) {
      color_object = rgbToObject(value);
    }

    if (key.includes("opacity")) {
      color_object.a = value;
    }
  }
  return color_object;
};

const rgbToObject = function (rgb_string) {
  let color = rgb_string
    .replace("rgb(", "")
    .replace(")", "")
    .replace(" ", "")
    .split(",");

  let int_color = color.map((x) => parseInt(x));
  return { r: int_color[0], g: int_color[1], b: int_color[2], a: 1 };
};

const create_root = function (properties) {
  let layername = properties.file.name.split(".")[0];
  let root = {};
  root["version"] = 8;
  root["name"] = layername;
  root["sources"] = {};
  root["sources"][layername] = {
    type: properties.file.name.split(".")[1],
    data: `./${properties.file.name}`,
  };
  root["layers"] = null;

  return root;
};

const create_fill_layer = function (layer_name) {
  return {
    id: `${layer_name}_fill`,
    source: layer_name,
    type: "fill",
    paint: { color: { r: 232, g: 227, b: 223, a: 0.7 } },
  };
};

const create_line_layer = function (layer_name) {
  return {
    id: `${layer_name}_border`,
    source: layer_name,
    type: "line",
    paint: {
      color: { r: 54, g: 154, b: 204, a: 1 },
      "line-width": 1,
    },
  };
};

const parse_geomtype = function (feature) {
  let feature_geom = feature.getGeometry();
  let geom_type;
  if (feature_geom instanceof Point) {
    geom_type = "Point";
  } else if (feature_geom instanceof LineString) {
    geom_type = "Line";
  } else if (
    feature_geom instanceof Polygon ||
    feature_geom instanceof MultiPolygon
  ) {
    geom_type = "Polygon";
  }

  return geom_type;
};

const generate_style_layers = function (geometry_type, layer_name) {
  let layers = [];

  if (geometry_type == "Polygon") {
    layers.push(create_fill_layer(layer_name));
    layers.push(create_line_layer(layer_name));
  }

  if (geometry_type == "Line") {
    layers.push(create_line_layer(layer_name));
  }

  return layers;
};

const create_style_object = function (data) {
  let geometry_type = parse_geomtype(data.features[0]);
  let layer_name = data.file.name.split(".")[0];

  let style_object = create_root(data);

  style_object["layers"] = generate_style_layers(geometry_type, layer_name);

  return style_object;
};

const create_styleJSON = function (style_object) {
  let style_json = JSON.parse(JSON.stringify(style_object));
  style_json.layers.forEach((layer, i) => {
    if (layer.type == "fill" || layer.type == "line") {
      let rgb = rgbaToPaint(layer.paint.color);
      delete Object.assign(layer.paint, {
        [`${layer.type}-color`]: layer.paint["color"],
      })["color"];

      layer.paint[`${layer.type}-color`] = rgb.color;
      layer.paint[`${layer.type}-opacity`] = rgb.opacity;
    }
  });

  return JSON.stringify(style_json, null, 2);
};

export default {
  rgbaToPaint,
  create_styleJSON,
  rgbToObject,
  create_style_object,
  paintToColorObject,
};
