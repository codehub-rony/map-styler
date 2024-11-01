import BaseStyle from "./BaseStyle.js";
import { OGCVectorTileDataSource } from "@/utils/datasources/DataSourceTypes";

class OGCTileStyle extends BaseStyle {
  constructor(style_name, tilejson_url, source_id, geometry_type, tiles_url) {
    super(style_name, source_id, geometry_type);
    this.tilejson_url = tilejson_url;
    this.tiles_url = tiles_url;
    this.vector_layer = null;

    this.#init();
  }

  #init() {
    this._datasource_type = new OGCVectorTileDataSource();
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
    });

    return JSON.stringify(style, null, 2);
  }

  async getFeatureAttributes() {
    let resp = await fetch(this.tilejson_url);
    let data = await resp.json();
    return data.vector_layers[0].fields;
  }
}

export default OGCTileStyle;
