import { Fill, Stroke, Style } from "ol/style.js";
import { Vector as VectorLayer } from "ol/layer.js";

import VectorTileLayer from "ol/layer/VectorTile.js";

class SelectionStyle {
  constructor() {
    this.style = new Style({
      fill: new Fill({
        color: "#eeeeee",
      }),
      stroke: new Stroke({ color: "rgba(218, 22, 22, 0.7)", width: 3 }),
    });
  }

  getStyle() {
    return this.style;
  }
}

class SelectionLayer {
  constructor(map, vector_layer, source_type) {
    this.style = new SelectionStyle();
    this.selection = {};
    this.selection_layer = this.#init_selection_layer(
      map,
      vector_layer,
      source_type
    );
  }

  #init_selection_layer(map, vector_layer, source_type) {
    let source = vector_layer.getSource();

    let styleFunction = (feature) => {
      if (feature.getId() in this.selection) {
        return this.style.getStyle();
      }
    };

    if (source_type === "ogc_vector_tile") {
      return new VectorTileLayer({
        map: map,
        source: source,
        style: styleFunction,
      });
    } else if (source_type === "geojson") {
      return new VectorLayer({
        map: map,
        source: source,
        style: styleFunction,
      });
    } else {
      throw Error(
        `SelectInteraction does not support ${source_type} data source`
      );
    }
  }
}

class SelectInteraction extends SelectionLayer {
  constructor(map, vector_layer, source_type) {
    super(map, vector_layer, source_type);

    map.on("click", (event) => {
      vector_layer.getFeatures(event.pixel).then((features) => {
        if (!features.length) {
          this.selection = {};
          this.selection_layer.changed();
          return;
        }

        const feature = features[0];

        if (!feature) {
          return;
        }

        const fid = feature.getId();

        this.selection[fid] = feature;
        this.selection_layer.changed();
      });
    });
  }
}

export default SelectInteraction;
