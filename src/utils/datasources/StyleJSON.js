import FillLayer from "../stylejson/layers/FillLayer";
import LineLayer from "../stylejson/layers/LineLayer";
import CircleLayer from "../stylejson/layers/CircleLayer";

class StyleJSON {
  constructor(
    stylename = null,
    source = null,
    geometry_type = null,
    stylejson = null
  ) {
    this._version = 8;
    this._center;
    this._zoom;
    this._sources = {};
    this._layers = [];

    if (stylejson) {
      this._version = stylejson.version;
      this._center = stylejson.center;
      this._zoom = stylejson.zoom;

      this.#loadLayerFromStyleJSON(stylejson.layers);

      this.#initSources(stylejson.sources);
    } else if (stylename && source && geometry_type) {
      this.addSource(source);
      this.createDefaultLayers(stylename, source.id, geometry_type);
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

  #loadLayerFromStyleJSON(layers) {
    layers.forEach((layer_config) => {
      if (layer_config.type === "line") {
        let layer = new LineLayer(
          layer_config.label,
          layer_config.source,
          layer_config
        );
        this._layers.push(layer);
      }

      if (layer_config.type === "fill") {
        let layer = new FillLayer(
          layer_config.label,
          layer_config.source,
          layer_config
        );
        this._layers.push(layer);
      }
    });
  }

  addSource(source) {
    this._sources = Object.assign(
      {},
      this._sources,
      source.getSourceAsObject()
    );
  }

  createDefaultLayers(stylename, source_id, geometry_type) {
    if (!geometry_type) {
      throw new Error("Geometry type is required");
    } else if (geometry_type === "polygon") {
      this._layers.push(new FillLayer(`${stylename}_fill`, source_id));
      this._layers.push(new LineLayer(`${stylename}_line`, source_id));
    } else if (geometry_type === "line") {
      this._layers.push(new LineLayer(`${stylename}_line`, source_id));
    } else if (geometry_type === "point") {
      this._layers.push(new CircleLayer(`${stylename}_circle`, source_id));
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

  processPaintAttributes(paint) {
    const result = {};

    for (const key in paint) {
      if (paint.hasOwnProperty(key)) {
        const attribute = paint[key];

        if (
          key === "line-color" ||
          key === "fill-color" ||
          key === "circle-stroke-color" ||
          key === "circle-color"
        ) {
          const rgba_color = attribute.value;
          const { r, g, b, a } = rgba_color;
          result[key] = `rgb(${r},${g},${b})`;
          result[key.replace("color", "opacity")] = a;
        } else {
          result[key] = attribute.value;
        }
      }
    }

    return result;
  }

  getStyleJSON() {
    let json = {
      version: this._version,
      name: this._name,
      center: this._center,
      zoom: this._zoom,
      sources: this._sources,
      layers: JSON.parse(JSON.stringify(this._layers)),
    };

    json.layers.forEach((layer) => {
      if (layer.paint) {
        layer.paint = this.processPaintAttributes(layer.paint);
      }
    });

    return json;
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
