<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
    <MapPopup :map="map" v-if="map && styleObjects.length > 0" />
  </div>
</template>

<script>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { unByKey } from "ol/Observable.js";
import * as olExtent from "ol/extent";

// Components
import MapPopup from "@/components/MapPopup.vue";

// basemap
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import TileJSON from "ol/source/TileJSON";

// Styling
import { stylefunction } from "ol-mapbox-style";

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
import { mapState, mapActions } from "pinia";

import OGCVectorTiles from "@/utils/datasources/OGCVectorTiles";
import GeoJSONFeatures from "@/utils/datasources/GeoJSONFeatures";

export default {
  components: {
    MapPopup,
  },
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObjects", "currentProject"]),
  },
  data() {
    return {
      feature_attributes: [],
      map: null,
      view: null,
      height: null,
    };
  },

  mounted() {
    this.setHeight();
    this.initMap();

    if (this.styleObjects.length > 0) {
      this.initVectorLayers();
    }
    // else {
    //   this.$router.push("/projects");
    // }

    this.map.on("click", (evt) => {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });
  },
  methods: {
    ...mapActions(useAppStore, ["isStyleObjectLoaded"]),
    initMap: function () {
      this.view = new View({
        center: [595074, 6829276],

        zoom: 6,
      });
      this.map = new Map({
        layers: [],
        target: "map_container",
        view: this.view,
        controls: [],
      });
      let maptiler_key = import.meta.env.VITE_MAPTILER_KEY;
      let background = new TileLayer({
        source: new TileJSON({
          url: `https://api.maptiler.com/maps/dataviz/tiles.json?key=${maptiler_key}`,
          tileSize: 512,
          crossOrigin: "anonymous",
        }),
      });

      this.map.addLayer(background);
    },
    createOGCVectorLayer: function (styleObject) {
      let layer = new VectorTileLayer({
        source: new OGCVectorTile({
          url: styleObject.tilejson_url,
          format: new MVT(),
          projection: "EPSG:3857",
        }),
      });

      layer.set("source_id", styleObject.source_id);

      this.map.addLayer(layer);

      this.applyStyle(layer, styleObject.getStyleJSON(), styleObject.source_id);

      let layer_source = layer.getSource();
      const key = layer_source.on("change", () => {
        if (layer_source.getState() === "ready") {
          const extent = layer_source.getTileGrid().getExtent();
          this.zoomToExtent(extent);
          unByKey(key);
        }
      });
    },
    initVectorLayers: function () {
      this.styleObjects.forEach((styleObject) => {
        if (styleObject instanceof GeoJSONFeatures) {
          let geojson_layer = new VectorLayer({
            source: new VectorSource(),
          });
          let features = new GeoJSON().readFeatures(styleObject.geojson, {
            featureProjection: "EPSG:3857",
          });

          // Setting id for SelectionInteraction
          features.forEach((feature, i) => {
            feature.setId(i);
          });

          this.applyStyle(
            geojson_layer,
            styleObject.getStyleJSON(),
            styleObject.source_id
          );

          geojson_layer.getSource().addFeatures(features);
          geojson_layer.set("source_id", styleObject.source_id);
          this.map.addLayer(geojson_layer);
          this.zoomToExtent(geojson_layer.getSource().getExtent());
        }

        if (styleObject instanceof OGCVectorTiles) {
          this.createOGCVectorLayer(styleObject);
        }
      });
    },

    zoomToExtent: function (extent) {
      if (extent) {
        let resolution = this.view.getResolutionForExtent(extent);
        let zoom = this.view.getZoomForResolution(resolution) - 0.3;
        let center = olExtent.getCenter(extent);
        this.view.animate({ zoom: zoom, center: center, duration: 1000 });
      }
    },

    setHeight: function () {
      this.height =
        window.innerHeight < 950 ? window.innerHeight * 0.8 : "85vh";
    },
    applyStyle: function (vectorlayer, stylejson, source_id) {
      stylefunction(vectorlayer, stylejson, source_id);
    },
  },
  watch: {
    styleObjects: {
      handler() {
        const map_layers = [...this.map.getLayers().getArray()].filter(
          (layer) => layer.get("source_id") !== undefined
        );
        const style_source_ids = this.styleObjects.map((obj) => obj.source_id);
        const map_source_ids = map_layers.map((layer) =>
          layer.get("source_id")
        );

        // Find styleObjects that have not been added to map
        const added = style_source_ids.filter(
          (source_id) => !map_source_ids.includes(source_id)
        );

        // Find styleObjects that have been removed, but are still on the map
        const removed = map_source_ids.filter(
          (source_id) => !style_source_ids.includes(source_id)
        );

        if (added.length > 0) {
          let object_to_add = this.styleObjects.find(
            (style_object) => style_object.source_id === added[0]
          );
          this.createOGCVectorLayer(object_to_add);
        }

        if (removed.length > 0) {
          let layer_to_remove = this.map
            .getLayers()
            .getArray()
            .find((layer) => layer.get("source_id") === removed[0]);
          this.map.removeLayer(layer_to_remove);
        }

        // update styles on update
        if (removed.length == added.length) {
          this.styleObjects.forEach((styleObject) => {
            let layer_to_style = map_layers.find(
              (layer) => layer.get("source_id") === styleObject.source_id
            );

            this.applyStyle(
              layer_to_style,
              styleObject.getStyleJSON(),
              styleObject.source_id
            );
          });
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
  border: solid 1px #e0e0e0;
}
</style>
