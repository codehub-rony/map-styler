import BaseStyle from "./BaseStyle.js";

class GeojsonStyle extends BaseStyle {
  constructor(layer_name, source_id, geometry_type, geojson) {
    super(layer_name, source_id, geometry_type, "geojson");
    this.initialize(geojson);
  }

  initialize(geojson) {
    this.sources[this.source_id] = { type: "geojson", data: "./data.geojson" };
    this.geojson = JSON.parse(geojson);
    this.createDefaultLayers();
  }

  getStyleAsJSON() {
    let style = {
      version: this.version,
      name: this.style_name,
      sources: this.sources,
      layers: this.layers.map((x) => x.getStyleAsObject()),
    };

    return JSON.stringify(style, null, 2);
  }

  getFeatureAttributes() {
    let keys = Object.keys(this.geojson.features[0].properties);
    let attributes = {};

    keys.forEach((key) => {
      let datatype = typeof this.geojson.features[0].properties[key];
      attributes[key] = datatype ? datatype : null;
    });


    return attributes;
  }
}

export default GeojsonStyle