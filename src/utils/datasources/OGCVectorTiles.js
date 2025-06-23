import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
import { TiledVectorSource } from "./StyleDataSources";
class OGCVectorTiles extends BaseDataSource {
  constructor(tilejson_url, tilejson, stylename, stylejson) {
    super();
    this._tilejson_url = null;

    if (stylejson) {
      this.#loadFromStyleJson(stylejson);
    } else if (tilejson_url && tilejson && stylename) {
      this.#initializeWithTileJSON(tilejson_url, tilejson, stylename);
    } else {
      throw new Error(
        "Insufficient parameters provided for OGCVectorTiles initialization."
      );
    }
  }

  #initializeWithTileJSON(tilejson_url, tilejson, stylename) {
    this._name = stylename;
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

  #loadFromStyleJson(stylejson) {
    const required_attributes = [
      "id",
      "source_id",
      "geometry_type",
      "tilejson_url",
      "stylejson",
    ];

    for (const attr of required_attributes) {
      if (!(attr in stylejson)) {
        throw new Error(`Missing required attribute: ${attr}`);
      }
    }

    this._id = stylejson.id;
    this._name = stylejson.name;
    this._description = stylejson.description;
    this._source_id = stylejson.source_id;
    this._projection = stylejson.projection;
    this._geometry_type = stylejson.geometry_type;
    this._tilejson_url = stylejson.tilejson_url;
    this._stylejson = new StyleJSON(
      stylejson.name,
      null,
      null,
      stylejson.stylejson
    );

    this.fetchFields();
  }

  get tilejson_url() {
    return this._tilejson_url;
  }

  async fetchFields() {
    if (!this._fields && this._tilejson_url) {
      return fetch(this._tilejson_url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(
              `Failed to fetch tilejson from ${this._tilejson_url}`
            );
          }
          return resp.json();
        })
        .then((tilejson) => {
          const layer = tilejson.vector_layers.find(
            (l) => l.id === this._source_id
          );
          if (!layer) {
            throw new Error(`Layer ${this._source_id} not found in tilejson`);
          }
          this._fields = layer.fields;
          return this._fields;
        });
    }
    return this._fields;
  }

  getStyleAsObject() {
    const styleObject = this._stylejson.getStyleAsObject();

    styleObject.layers = styleObject.layers.map((x) => x.getStyleAsObject());

    // styleObject.layers.forEach((layer) => {
    //   layer["source-layer"] = Object.keys(styleObject.sources)[0];
    // });

    return styleObject;
  }

  getStyleJSON() {
    let json = this._stylejson.getStyleJSON();

    // json.layers.forEach((layer) => {
    //   layer["source-layer"] = Object.keys(json.sources)[0];
    // });

    return JSON.stringify(json, null, 2);
  }
}

export default OGCVectorTiles;
