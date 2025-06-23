import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
import { GeoJsonSource } from "./StyleDataSources";

class GeoJSONFeatures extends BaseDataSource {
  constructor(stylename = null, geojson = null, source_config = null) {
    super();
    this._geojson = null;
    this._name;

    if (source_config) {
      this.#initializeWithConfig(source_config);
    } else if (stylename && geojson) {
      this.#initializeWithGeoJSON(stylename, geojson);
    } else {
      throw new Error(
        "Insufficient parameters provided for GeoJSONFeatures initialization."
      );
    }
  }

  #initializeWithGeoJSON(stylename, geojson) {
    this._name = stylename;
    if (typeof geojson === "string") {
      geojson = JSON.parse(geojson);
    }
    this._geometry_type = this.standarizeGeometryType(
      geojson.features[0].geometry.type.toLowerCase()
    );
    this._source_id = stylename;
    this._geojson = geojson;

    let source = new GeoJsonSource(this._source_id);
    this._stylejson = new StyleJSON(stylename, source, this._geometry_type);
  }

  #initializeWithConfig(source_config) {
    console.log("not implemented yet");
  }

  get geojson() {
    return this._geojson;
  }

  fetchFields() {
    if (!this._fields) {
      this._fields = this._geojson.features[0].properties;
    }

    return this._fields;
  }

  getStyleJSON() {
    let json = this._stylejson.getStyleJSON();

    return JSON.stringify(json, null, 2);
  }
}

export default GeoJSONFeatures;
