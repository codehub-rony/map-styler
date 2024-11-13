class StyleDataSources {
  constructor(source_id, type) {
    this._id = source_id;
    this._type = type;
  }

  get id() {
    return this._id;
  }
}

class GeojsonDataSource extends StyleDataSources {
  constructor() {
    super("GeoJSON");
  }
}

class TiledVectorSource extends StyleDataSources {
  constructor(source_id, tiles_url) {
    super(source_id, "vector");
    this._tiles = [tiles_url];
  }

  getStyleAsObject() {
    let styleObject = {};
    styleObject[this._id] = { type: this._type, tiles: this._tiles };
    return styleObject;
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

export { DataSourceTypes, GeojsonDataSource, TiledVectorSource };
