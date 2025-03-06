import BaseDataSource from "./BaseDataSource";
import StyleJSON from "./StyleJSON";
import { GeoJsonSource } from "./StyleDataSources";

class GeoJSONFeatures extends BaseDataSource {
  constructor(stylename = null, geojson = null, source_config = null) {
    super();
    this._geojson = null;

    if (source_config) {
      this.#initializeWithConfig(source_config);
    } else if (stylename && geojson) {
      this.#initializeWithGeoJSON(stylename, geojson);
    } else {
      throw new Error(
        "Insufficient parameters provided for OGCVectorTiles initialization."
      );
    }
  }

  #initializeWithGeoJSON(stylename, geojson) {
    this._style_name = stylename;
    if (typeof geojson === "string") {
      geojson = JSON.parse(geojson);
    }
    this._geometry_type = this.standarizeGeometryType(
      geojson.features[0].geometry.type.toLowerCase()
    );
    this._source_id = stylename;
    this._geojson = geojson;

    let source = new GeoJsonSource(this._source_id);
    this._stylejson = new StyleJSON(source, this._geometry_type);
  }

  #initializeWithConfig(source_config) {
    console.log("not implemented yet");
  }

  get geojson() {
    return this._geojson;
  }

  getStyleAsJSON() {
    const styleObject = this._stylejson.getStyleAsObject();

    styleObject.layers = styleObject.layers.map((x) => x.getStyleAsObject());

    return JSON.stringify(styleObject, null, 2);
  }
}

export default GeoJSONFeatures;
