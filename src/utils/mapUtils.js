// Vectortiles
import VectorTileSource from "ol/source/VectorTile.js";
import VectorTileLayer from "ol/layer/VectorTile.js";

// Goejson
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import { GeoJSON, MVT } from "ol/format.js";

class GeojsonLayer {
  constructor(geojson) {
    this.vector_layer = null;
    this.geometry_type = null;
    this.init(geojson);
  }

  init(geojson) {
    this.vector_layer = this.createVectorLayer();
    let features = this.parseFeatures(geojson);
    this.geometry_type = this.parseGeometryType(features[0]);

    this.vector_layer.getSource().addFeatures(features);
  }

  createVectorLayer() {
    let layer = new VectorLayer({
      source: new VectorSource(),
    });

    return layer;
  }

  parseGeometryType(feature) {
    return feature.getGeometry().getType();
  }

  parseFeatures(geojson) {
    let features = new GeoJSON().readFeatures(geojson, {
      featureProjection: "EPSG:3857",
    });

    return features;
  }

  getExtent() {
    return this.vector_layer.getSource().getExtent();
  }
  getVectorLayer() {
    return this.vector_layer;
  }
}

class VectortilesLayer {
  constructor(styleObject) {
    this.vector_layer = null;
    this.init(styleObject);
  }

  init(styleObject) {
    this.vector_layer = this.createVectorLayer(styleObject);
  }

  createVectorLayer(styleObject) {
    let layer = new VectorTileLayer({
      declutter: false,
      zindex: 30,
      source: new VectorTileSource({
        format: new MVT(),
        url: `${Object.values(styleObject.sources)[0].tiles[0]}`,
      }),
    });

    return layer;
  }

  getExtent() {
    return this.vector_layer.getExtent();
  }
  getVectorLayer() {
    return this.vector_layer;
  }
}

const createVectorLayer = function (styleObject) {
  let data_source = Object.values(styleObject.sources)[0];

  if (data_source.type === "geojson") {
    return new GeojsonLayer(styleObject.geojson);
  } else if (data_source.type === "vector") {
    return new VectortilesLayer(styleObject);
  } else {
    throw new Error(
      "Could not create a vector layer from source. Data source unknown"
    );
  }
};
export default {
  createVectorLayer,
};
