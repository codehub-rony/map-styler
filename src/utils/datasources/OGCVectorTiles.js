import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
class OGCVectorTiles extends BaseDataSource {
  constructor(
    tilejson_url = null,
    tilejson = null,
    stylename = null,
    source_config = null
  ) {
    super();
    this._tilejson_url = null;

    if (source_config) {
      this.#initializeWithConfig(source_config);
    } else if (tilejson_url && tilejson && stylename) {
      this.#initializeWithTileJSON(tilejson_url, tilejson, stylename);
    } else {
      throw new Error(
        "Insufficient parameters provided for OGCVectorTiles initialization."
      );
    }
  }

  #initializeWithTileJSON(tilejson_url, tilejson, stylename) {
    this._geometry_type = this.standarizeGeometryType(
      tilejson.vector_layers[0].geometry_type
    );
    this._tilejson_url = tilejson_url;
    this._source_id = tilejson.vector_layers[0].id;

    this._stylejson = new StyleJSON(stylename, tilejson, this._geometry_type);
  }

  #initializeWithConfig(source_config) {
    let config = source_config;

    if (typeof config === "string") {
      config = JSON.parse(source_config);
    }

    this._projection = config.projection;
    this._geometry_type = config.geometry_type;
    this._stylejson = new StyleJSON(null, null, config.stylejson);
  }

  get tilejson_url() {
    return this._tilejson_url;
  }
}

export default OGCVectorTiles;
