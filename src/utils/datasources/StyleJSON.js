import FillLayer from "../stylejson/layers/FillLayer";
import LineLayer from "../stylejson/layers/LineLayer";
import CircleLayer from "../stylejson/layers/CircleLayer";
import { TiledVectorSource } from "./StyleDataSources";

class StyleJSON {
  constructor(
    stylename = null,
    tilejson = null,
    geometry_type = null,
    stylejson = null
  ) {
    this._version = 8;
    this._name;
    this._center;
    this._zoom;
    this._sources = {};
    this._layers = [];

    if (stylejson) {
      this._version = stylejson.version;
      this._name = stylejson.name;
      this._center = stylejson.center;
      this._zoom = stylejson.zoom;
      // this._layer

      this.#initSources(stylejson.sources);
    } else if (stylename && tilejson && geometry_type) {
      this._name = stylename;

      let source_id = tilejson.vector_layers[0].id;
      let tiles_url = tilejson.tiles[0];

      let source = new TiledVectorSource(source_id, tiles_url);
      this.addSource(source.getStyleAsObject());
      this.createDefaultLayers(source_id, geometry_type);
    } else {
      throw new Error(
        "Insufficient parameters provided for StyleJSON initialization."
      );
    }
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
    this._sources = Object.assign({}, this._sources, source);
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

  getStyleAsJSON() {
    const styleObject = this.getStyleAsObject();

    let new_layers = styleObject.layers.map((x) => x.getStyleAsObject());
    styleObject.layers = new_layers;
    styleObject.layers.forEach((layer) => {
      layer["source-layer"] = Object.keys(this._sources)[0];
    });

    return JSON.stringify(styleObject, null, 2);
  }

  setVisibilityAllLayers(isVisible) {
    this._layers.forEach((layer) => {
      layer.setVisibility(isVisible);
    });
  }
}

export default StyleJSON;
