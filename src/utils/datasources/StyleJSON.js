import FillLayer from "../stylejson/layers/FillLayer";
import LineLayer from "../stylejson/layers/LineLayer";
import CircleLayer from "../stylejson/layers/CircleLayer";

class StyleJSON {
  constructor(
    id = null,
    stylename = null,
    source = null,
    geometry_type = null,
    stylejson = null
  ) {
    this._id = null;
    this._version = 8;
    this._name;
    this._center;
    this._zoom;
    this._sources = {};
    this._layers = [];

    if (stylejson) {
      this._id = id;
      this._version = stylejson.version;
      this._name = stylejson.name;
      this._center = stylejson.center;
      this._zoom = stylejson.zoom;
      // this._layer

      this.#initSources(stylejson.sources);
    } else if (stylename && source && geometry_type) {
      this._name = stylename;

      this.addSource(source);
      this.createDefaultLayers(source.id, geometry_type);
    } else {
      throw new Error(
        "Insufficient parameters provided for StyleJSON initialization."
      );
    }
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  get sources() {
    return this._sources;
  }

  get layers() {
    return this._layers;
  }

  #initSources(style_sources) {
    this._sources = Object.assign({}, this._sources, style_sources);
  }

  addSource(source) {
    this._sources = Object.assign({}, this._sources, source.getStyleAsObject());
  }

  createDefaultLayers(source_id, geometry_type) {
    if (!geometry_type) {
      throw new Error("Geometry type is required");
    } else if (geometry_type === "polygon") {
      this._layers.push(new FillLayer(`${this._name}_fill`, source_id, true));
      this._layers.push(new LineLayer(`${this._name}_line`, source_id));
    } else if (geometry_type === "line") {
      this._layers.push(new LineLayer(`${this._name}_line`, source_id));
    } else if (geometry_type === "point") {
      this._layers.push(new CircleLayer(`${this._name}_circle`, source_id));
    } else {
      throw new Error("Unkown geometry type from geoJSON");
    }
  }

  getStyleAsObject() {
    const styleObject = Object.getOwnPropertyNames(this).reduce((acc, prop) => {
      const modifiedProp = prop.replace("_", "");
      acc[modifiedProp] = this[prop];
      return acc;
    }, {});

    return styleObject;
  }

  setVisibilityAllLayers(isVisible) {
    this._layers.forEach((layer) => {
      layer.setVisibility(isVisible);
    });
  }

  createLayer(source_id, geometry_type) {
    switch (geometry_type) {
      case "point":
        return new CircleLayer(null, source_id, source_id);
      case "line":
        return new LineLayer(null, source_id, source_id);
      case "polygon":
        return new FillLayer(null, source_id, source_id);
      default:
        return null;
    }
  }

  deleteLayer(id_to_remove) {
    this._layers.forEach((layer, i) => {
      if (layer.id === id_to_remove) {
        this._layers.splice(i, 1);
      }
    });
  }

  addLayer(new_layer) {
    let position_last_element = this._layers.length - 1;
    this._layers.splice(position_last_element, 0, new_layer);
  }
}

export default StyleJSON;
