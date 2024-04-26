import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import { GeoJSON } from "ol/format.js";

class BaseDataSource {
  constructor(label) {
    this._label = label;
    this.vectorLayer = null;
    this.projection = "EPSG:3857";
  }

  get label() {
    return this._label;
  }

  getLayerSource() {
    return this.vectorLayer.getSource();
  }
}

class GeojsonDataSource extends BaseDataSource {
  constructor() {
    super("GeoJSON");
  }
}

class VectorTileDataSource extends BaseDataSource {
  constructor() {
    super("OGC Vectortile");
  }
}

class DataSourceTypes {
  constructor() {
    this.sources = this.#init_sources();
  }

  #init_sources() {
    let sources = [];
    sources.push(new GeojsonDataSource());
    sources.push(new VectorTileDataSource());

    return sources;
  }

  getDataSources() {
    return this.sources;
  }
}

export { DataSourceTypes, GeojsonDataSource, VectorTileDataSource };
