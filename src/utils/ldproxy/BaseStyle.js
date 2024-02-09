import FillLayer from "./FillLayer.js";
import LineLayer from "./LineLayer.js";
import CircleLayer from "./CircleLayer.js";

const geometry_types = { point: "point", polygon: "polygon", line: "line" };

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
    this.geometry_type = this.standarizeGeometryType(geometry_type);
  }

  standarizeGeometryType(source_geom_type) {
    let geom_type = source_geom_type.toLowerCase();

    const polygon = ["polygon", "multipolygon", "polygons"];
    const line = ["linestring", "multilinestring"];

    if (polygon.includes(geom_type)) {
      return "polygon";
    } else if (line.includes(geom_type)) {
      return "line";
    } else if (geom_type.toLowerCase() === "point") {
      return "point";
    } else {
      throw new Error("Unknown geometry type");
    }
  }

  createDefaultLayers() {
    if (!this.geometry_type) {
      throw new Error("Style has no geometry_type");
    } else if (this.geometry_type === geometry_types.polygon) {
      this.layers.push(new FillLayer(this.style_name, this.source_id));
      this.layers.push(new LineLayer(this.style_name, this.source_id));
    } else if (this.geometry_type === geometry_types.line) {
      this.layers.push(new LineLayer(this.style_name, this.source_id));
    } else if (this.geometry_type === geometry_types.point) {
      this.layers.push(new CircleLayer(this.style_name, this.source_id));
    } else {
      throw new Error("Unkown geometry type from geoJSON");
    }
  }

  createLayer() {
    switch (this.geometry_type) {
      case geometry_types.point:
        return new CircleLayer(this.style_name, this.source_id);
      case geometry_types.line:
        return new LineLayer(this.style_name, this.source_id);
      case geometry_types.polygon:
        return new FillLayer(this.style_name, this.source_id);
      default:
        return null;
    }
  }

  addFilter(layer_id, layer_label, filter) {
    let new_layer = this.createLayer();
    new_layer["id"] = layer_id;
    new_layer["label"] = layer_label;
    new_layer.attributes[0].value = { r: 253, g: 174, b: 97, a: 0.7 };
    new_layer["filter"] = filter;

    if (new_layer instanceof FillLayer) {
      let index = this.layers.length - 1;
      this.layers.splice(index, 0, new_layer);
    } else {
      this.layers.push(new_layer);
    }
  }

  deleteLayer(layer_id) {
    this.layers.forEach((layer, i) => {
      if (layer.id === layer_id) {
        this.layers.splice(i, 1);
      }
    });
  }
}

export default BaseStyle;
