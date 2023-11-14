import BaseStyle from "./BaseStyle.js";

class OGCTileStyle extends BaseStyle {
  constructor(style_name, tilejson_url, source_id, geometry_type, tiles_url) {
    super(style_name, source_id, geometry_type, "ogc_vector_tile");
    this.tilejson_url = tilejson_url;
    this.tiles_url = tiles_url;
    this.vector_layer = null;

    this.init();
  }

  init() {
    this.sources[this.source_id] = { type: "vector", tiles: [this.tiles_url] };
    this.createDefaultLayers();
  }
  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.style_name,
      sources: this.sources,
      layers: this.layers.map((x) => x.getStyleAsObject()),
    };

    style.layers.forEach((layer) => {
      layer["source-layer"] = this.source_id;
      layer["layout"] = {};
      layer.layout["visibility"] = "visible";
    });

    return JSON.stringify(style, null, 2);
  }

  addFilter(layer_id, layer_label, filter) {
    let new_layer = this.createLayer();

    new_layer["id"] = layer_id;
    new_layer["label"] = layer_label;
    new_layer.attributes[0].value = { r: 253, g: 174, b: 97, a: 0.7 };
    new_layer["filter"] = filter;
    let index = this.layers.length - 1;
    this.layers.splice(index, 0, new_layer);
  }
  async getFeatureAttributes() {
    let resp = await fetch(this.tilejson_url);
    let data = await resp.json();
    return data.vector_layers[0].fields;
  }
}

export default OGCTileStyle;
