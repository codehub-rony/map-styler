class BaseDataSource {
  constructor(label) {
    this._label = label;
    this.projection = "EPSG:3857";
  }

  get label() {
    return this._label;
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
