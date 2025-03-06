class StyleDataSources {
  constructor(source_id, type) {
    this._id = source_id;
    this._type = type;
  }

  get id() {
    return this._id;
  }
}

class TiledVectorSource extends StyleDataSources {
  constructor(source_id, tiles_url) {
    super(source_id, "vector");
    this._tiles = [tiles_url];
  }

  getSourceAsObject() {
    let styleObject = {};
    styleObject[this._id] = { type: this._type, tiles: this._tiles };
    return styleObject;
  }
}

class GeoJsonSource extends StyleDataSources {
  constructor(source_id) {
    super(source_id, "geojson");
    this._data = "./data.geojson";
  }
  getSourceAsObject() {
    let styleObject = {};
    styleObject[this._id] = { type: this._type, data: this._data };
    return styleObject;
  }
}

export { TiledVectorSource, GeoJsonSource };
