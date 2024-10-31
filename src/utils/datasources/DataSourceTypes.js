import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import VectorTileLayer from "ol/layer/VectorTile.js";
import OGCVectorTile from "ol/source/OGCVectorTile.js";
import { GeoJSON, MVT } from "ol/format.js";

class BaseDataSource {
  constructor(label) {
    this._label = label;
    this._ol_vector_layer = null;
    this.projection = "EPSG:3857";
  }

  get label() {
    return this._label;
  }

  get ol_vector_layer() {
    return this._ol_vector_layer;
  }
}

class GeojsonDataSource extends BaseDataSource {
  constructor() {
    super("GeoJSON");
  }
}

class OGCVectorTileDataSource extends BaseDataSource {
  constructor() {
    super("OGC Vectortile");
  }

  create_ol_layer(tilejson_url, source_id) {
    this._ol_vector_layer = new VectorTileLayer({
      source: new OGCVectorTile({
        url: tilejson_url,
        format: new MVT(),
      }),
    });

    this._ol_vector_layer.set("source_id", source_id);
    return this._ol_vector_layer;
  }
}

class DataSourceTypes {
  constructor() {
    this.sources = this.#init_sources();
  }

  #init_sources() {
    let sources = [];
    sources.push(new GeojsonDataSource());
    sources.push(new OGCVectorTileDataSource());

    return sources;
  }

  getDataSources() {
    return this.sources;
  }
}

export { DataSourceTypes, GeojsonDataSource, OGCVectorTileDataSource };
