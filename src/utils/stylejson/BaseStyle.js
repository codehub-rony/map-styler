import FillLayer from "./layers/FillLayer.js";
import LineLayer from "./layers/LineLayer.js";
import CircleLayer from "./layers/CircleLayer.js";

const geometry_types = { point: "point", polygon: "polygon", line: "line" };

class BaseStyle {
  constructor(stylejson) {
    this._version = 8;
    this._style_name = "New style";
    this._source_id = "hello"; // use getsourceid function from datasource class
    this._sources = {}; // create a class for datasources
    this._layers = [];

    if (stylejson) {
      this.#parse_stylejson(stylejson);
    }
  }

  #parse_stylejson(stylejson) {
    let json = stylejson;
    if (stylejson && typeof stylejson === "string") {
      json = JSON.parse(stylejson);
    }

    this._style_name = json.style_name;
  }

  get style_name() {
    return this._style_name;
  }

  set style_name(style_name) {
    this._style_name = style_name;
  }

  get source_id() {
    return this._source_id;
  }

  set source_id(id) {
    this.source_id = id;
  }

  get datasource_type() {
    return this._datasource_type;
  }

  set datasource_type(type) {
    this._datasource_type = type;
  }
  get geometry_type() {
    return this.geometry_type;
  }

  set geometry_type(geometry_type) {
    this._geometry_type = this.standarizeGeometryType(geometry_type);
  }

  createDefaultLayers(geometry_type) {
    if (!geometry_type) {
      throw new Error("Style has no geometry_type");
    } else if (geometry_type === geometry_types.polygon) {
      this._layers.push(
        new FillLayer(`${this._style_name}_fill`, this._source_id, true)
      );
      this._layers.push(
        new LineLayer(`${this._style_name}_line`, this._source_id)
      );
    } else if (geometry_type === geometry_types.line) {
      this._layers.push(
        new LineLayer(`${this._style_name}_line`, this._source_id)
      );
    } else if (geometry_type === geometry_types.point) {
      this._layers.push(
        new CircleLayer(`${this._style_name}_circle`, this._source_id)
      );
    } else {
      throw new Error("Unkown geometry type from geoJSON");
    }
  }

  createLayer(label) {
    switch (this._geometry_type) {
      case geometry_types.point:
        return new CircleLayer(label, this._source_id);
      case geometry_types.line:
        return new LineLayer(label, this._source_id);
      case geometry_types.polygon:
        return new FillLayer(label, this._source_id, false);
      default:
        return null;
    }
  }
  addLayer(new_layer) {
    let position_last_element = this._layers.length - 1;
    this._layers.splice(position_last_element, 0, new_layer);
  }

  addFilter(layer_id, layer_label, filter) {
    let new_layer = this.createLayer();
    new_layer["id"] = layer_id;
    new_layer["label"] = layer_label;
    new_layer.attributes[0].value = this.generateRGBAColor();
    new_layer["filter"] = filter;

    if (new_layer instanceof FillLayer) {
      let index = this._layers.length - 1;
      this._layers.splice(index, 0, new_layer);
    } else {
      this._layers.push(new_layer);
    }
  }

  deleteLayer(layer_id) {
    this._layers.forEach((layer, i) => {
      if (layer.id === layer_id) {
        this._layers.splice(i, 1);
      }
    });
  }

  setVisibilityAllLayers(isVisble) {
    this._layers.forEach((layer) => {
      layer.setVisibility(isVisble);
    });
  }
}

export default BaseStyle;
