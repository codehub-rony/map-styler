<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
  </div>
</template>

<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { unByKey } from "ol/Observable.js";
import * as olExtent from "ol/extent";

// basemap
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";

// Styling
import { stylefunction } from "ol-mapbox-style";

// Utils
import SelectInteraction from "@/utils/mapviewer/SelectInteraction.js";

// OGC Tile layer
import VectorTileLayer from "ol/layer/VectorTile.js";
import OGCVectorTile from "ol/source/OGCVectorTile.js";
import { GeoJSON, MVT } from "ol/format.js";

// Goejson
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import "../../node_modules/ol/ol.css";

// store
import { useAppStore } from "@/store/app.js";
import { mapState } from "pinia";

import { Fill, Stroke, Style } from "ol/style.js";

export default {
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "dataSource"]),
  },
  data() {
    return {
      map: null,
      view: null,
      height: null,
      vectorLayer: null,
      selectionLayer: null,
      selection: {},
    };
  },
  mounted() {
    this.setHeight();
    this.initMap();

    if (this.styleObject.source_type === "geojson") {
      this.initSelectInteraction(this.styleObject.source_type);
    }

    // Redirect to landingpage on pagre reload
    if (this.styleObject) {
      this.createVectorLayer();
    } else {
      this.$router.push("/");
    }

    this.map.on("click", (event) => {
      // console.log(evt.coordinate, evt.map.getView().getZoom());

      // vectortile click interaction
      if (this.styleObject.source_type === "ogc_vector_tile") {
        this.selection = {};
        this.vectorLayer.getFeatures(event.pixel).then((features) => {
          if (!features.length) {
            this.selection = {};
            this.selectionLayer.changed();
            return;
          }
          const feature = features[0];
          if (!feature) {
            return;
          }
          const fid = feature.getId();

          // add selected feature to lookup
          this.selection[fid] = feature;

          this.selectionLayer.changed();
        });
      }
    });
  },
  methods: {
    initMap: function () {
      this.view = new View({
        center: [595074, 6829276],

        zoom: 6,
      });
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map_container",
        view: this.view,
        controls: [],
      });
    },
    initSelectInteraction: function (source_type) {
      let select = new SelectInteraction(source_type);

      if (select) {
        this.map.addInteraction(select);
      }
    },
    createSelectionLayer: function (map, vtLayer) {
      const selectedCountryStyle = new Style({
        stroke: new Stroke({
          color: "rgba(200,20,20,0.8)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(200,20,20,0.4)",
        }),
      });

      this.selectionLayer = new VectorTileLayer({
        map: map,
        renderMode: "vector",
        source: vtLayer.getSource(),
        style: (feature) => {
          if (feature.getId() in this.selection) {
            return selectedCountryStyle;
          }
        },
      });
    },
    createVectorLayer: function () {
      if (this.styleObject.source_type === "geojson") {
        this.vectorLayer = new VectorLayer({
          source: new VectorSource(),
        });
        let features = new GeoJSON().readFeatures(this.styleObject.geojson, {
          featureProjection: "EPSG:3857",
        });
        this.vectorLayer.getSource().addFeatures(features);
        this.map.addLayer(this.vectorLayer);
        this.zoomToExtent(this.vectorLayer.getSource().getExtent());
      }

      if (this.styleObject.source_type === "ogc_vector_tile") {
        const source = new OGCVectorTile({
          url: this.styleObject.tilejson_url,
          format: new MVT(),
        });
        this.vectorLayer = new VectorTileLayer({
          source: source,
        });

        this.createSelectionLayer(this.map, this.vectorLayer);

        this.map.addLayer(this.vectorLayer);
        const key = source.on("change", () => {
          if (source.getState() === "ready") {
            const extent = source.getTileGrid().getExtent();
            this.zoomToExtent(extent);
            unByKey(key);
          }
        });
      }
    },
    zoomToExtent: function (extent) {
      let resolution = this.view.getResolutionForExtent(extent);
      let zoom = this.view.getZoomForResolution(resolution) - 0.3;
      let center = olExtent.getCenter(extent);
      this.view.animate({ zoom: zoom, center: center, duration: 1000 });
    },

    setHeight: function () {
      this.height =
        window.innerHeight < 950 ? window.innerHeight * 0.8 : "85vh";
    },
  },
  watch: {
    styleObject: {
      handler() {
        if (this.vectorLayer) {
          stylefunction(
            this.vectorLayer,
            this.styleObject.getStyleAsJSON(),
            this.styleObject.source_id
          );
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
#map_container {
  height: 85vh;
}
</style>
