import { Point, LineString, Polygon } from "ol/geom.js";
const rgbaToRgbText = function (color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};

const rgbToObject = function (text, opacity) {
  let color = text
    .replace("rgb(", "")
    .replace(")", "")
    .replace(" ", "")
    .split(",");

  let int_color = color.map((x) => parseInt(x));
  return { r: int_color[0], g: int_color[1], b: int_color[2], a: opacity };
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
    source: "buildings",
    type: "fill",
    paint: { "fill-color": "rgb(232, 227, 223)", "fill-opacoty": 0.7 },
  };
};

const create_line_layer = function (layer_name) {
  return {
    id: `${layer_name}_border`,
    source: "buildings",
    type: "line",
    paint: {
      "line-color": "rgb(54, 154, 204)",
      "line-width": 1,
      opacity: 1,
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
  } else if (feature_geom instanceof Polygon) {
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

  return layers;
};

const create_style_object = function (data) {
  let geometry_type = parse_geomtype(data.features[0]);
  let layer_name = data.file.name.split(".")[0];

  let style_object = create_root(data);

  style_object["layers"] = generate_style_layers(geometry_type, layer_name);

  return style_object;
};

export default {
  rgbaToRgbText,
  rgbToObject,
  create_style_object,
};
