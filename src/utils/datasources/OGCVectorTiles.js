import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
import { TiledVectorSource } from "./StyleDataSources";
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
    this._style_name = stylename;
    this._geometry_type = this.standarizeGeometryType(
      tilejson.vector_layers[0].geometry_type
    );
    this._tilejson_url = tilejson_url;
    this._source_id = tilejson.vector_layers[0].id;
    this._fields = tilejson.vector_layers[0].fields;

    let tiles_url = tilejson.tiles[0];
    let source = new TiledVectorSource(this._source_id, tiles_url);

    this._stylejson = new StyleJSON(stylename, source, this._geometry_type);
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

  getStyleAsJSON() {
    const styleObject = this._stylejson.getStyleAsObject();

    styleObject.layers = styleObject.layers.map((x) => x.getStyleAsObject());

    styleObject.layers.forEach((layer) => {
      layer["source-layer"] = Object.keys(styleObject.sources)[0];
    });

    return JSON.stringify(styleObject, null, 2);
  }
}

export default OGCVectorTiles;
