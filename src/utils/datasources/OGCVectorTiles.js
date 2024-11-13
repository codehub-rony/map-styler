import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
import { TiledVectorSource } from "./StyleDataSources";

class OGCVectorTiles extends BaseDataSource {
  constructor(source_config) {
    super();
    this._tilejson_url = "";

    if (source_config) {
      this.#parseConfig(source_config);
    }
  }

  #parseConfig(source_config) {
    let config = source_config;

    if (typeof config === "string") {
      config = JSON.parse(source_config);
    }

    this._label = config.label;
    this._projection = config.projection;
    this._tilejson_url = config.tilejson_url;
    this._geometry_type = config.geometry_type;
    this._stylejson = new StyleJSON(config.stylejson);
  }

  initDefaultStyle() {
    this._stylejson = new StyleJSON();
    this._stylejson.style_name = this._label;
    let source = new TiledVectorSource(this._label, this._tilejson_url);
    this._stylejson.addSource(source.getStyleAsObject());
    this._stylejson.createDefaultLayers(source.id, this._geometry_type);
  }

  get tilejson_url() {
    return this._tilejson_url;
  }

  set tilejson_url(url) {
    this._tilejson_url = url;
  }
}

export default OGCVectorTiles;
