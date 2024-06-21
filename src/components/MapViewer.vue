<template>
  <div>
    <v-sheet :height="height" id="map_container"> </v-sheet>
    <MapPopup
      :map="map"
      :vectorLayer="vectorLayer"
      :styleObject="styleObject"
      v-if="map && styleObject"
    />
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
import { stylefunction, applyStyle } from "ol-mapbox-style";

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

// pmtiles
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { Style, Stroke, Fill } from "ol/style";

export default {
  components: {
    MapPopup,
  },
  props: {
    geodataSource: Object,
  },
  computed: {
    ...mapState(useAppStore, ["styleObject", "dataSource"]),
  },
  data() {
    return {
      feature_attributes: [],

      map: null,
      view: null,
      height: null,
      vectorLayer: null,
    };
  },

  mounted() {
    this.setHeight();
    this.initMap();

    // Redirect to landingpage on page reload
    if (this.styleObject) {
      this.createVectorLayer();
      this.applyStyle(
        this.vectorLayer,
        this.styleObject.getStyleAsJSON(),
        this.styleObject.source_id
      );
    } else {
      this.$router.push("/");
    }

    this.map.on("click", (evt) => {
      console.log(evt.coordinate, evt.map.getView().getZoom());
    });

    const pms = new VectorTile({
      declutter: true,
      source: new PMTilesVectorSource({
        url: "",
      }),
      // style: new Style({
      //   stroke: new Stroke({
      //     color: "gray",
      //     width: 1,
      //   }),
      //   fill: new Fill({
      //     color: "rgba(2,2,20,0.4)",
      //   }),
      // }),
    });
    this.map.addLayer(pms);

    let stylesd = {
      version: 8,
      name: "TEST",
      sources: {
        best: {
          type: "vector",
          tiles: [
            "https://mapfactory.s3.eu-north-1.amazonaws.com/munies.pmtiles?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRzBFAiEAw9bzcwV%2F0iwH6was0pdFBzUfE7KQOLl0Nh93KDaGc2kCIHUPwiJDB26cs1A10Mqr3WO9UTtdjhO5LNgR8f4BY7RJKuQCCBkQAxoMODk2NTU4NjQxMzQ3IgyCpTWxZL4qrun4DrsqwQKH8fQ0zAdUuuwDXSwU4NGn7M6jvVTukdUyg1cqv88FiN3AwUGsukz2tkvndKR17JN7JSCMKkNAnXInOO0e%2B0kwAAkkcHf6rk0VwMb4iJimu2%2FNbKoWTHK3vnADTj90tapMyGx5ERpwDq5pFeG48AA18aBqkH1XWWt3v0OVHEJYlHbY4ZxnI%2BV0dfPafQZWPytRfdl6OF5A%2BCyZLAduFEVKBVY7gJrPnoaB%2FGtzbpFG83pnokGm7NFBb5xcw29SgiFaxQ%2B9j29GRJWQhypUJgaDBSr%2B9%2BfEuYGx1aTs7pgT6iTx6IsHclwvS19vn8H1OEl8Tqf%2BABAGIpV3zOVciV%2Fy9hHFzFKN3ucESa0jlpHoP3O8NP%2BkSk8MCSYACCGGZxfnDWKgTrFCiX6%2BfEkR%2FiiNNob0nwvwpHl6jW91BFpIKLMwjJ%2FdsgY6swJoUOJc4sq3tlcolbhr1kB%2F6E53HIzhVNP%2BoMcs6A0c1WO2DOgfGVCh2i6oI%2BsB1m%2B4EqfgaEkjPjpzW1dw4r4wfV9RBN8ZTQ31Ecs%2FckFWB4Pa4dn%2B1BavvLpRUtTmDrb8N3sN93WdLFB7E5ZLWgsqL8F4bzwF%2BYvl3etAfw7A5zw5z8LECcG0xYzXJJeMG6Akm980HpbVqxaJLtY9DTYb%2BfpKcE%2FTN4ChmgeRl%2Fe1NyMa%2FU61syBPJkBWFmJPsMtqI0IUBdh6Yyosbf4ssCEMHx%2BQWeRwQZK2Xw8Ko7X1KGl01zow5o5G%2Fr3pXzyVWFR82k1pUqDpgVLGSuvh7c%2BD6IjCjZ9CtpEAQ4emI6DY2GazzCsuvTGATgPmf1xwoU%2BxTj3W48I%2BnbsBGzWt3YiFcGii&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240529T193321Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIA5BPYPGDB7GYL67H6%2F20240529%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=f9387ae7dec0dba7b740c9557d64fa30a608e93ef14413723ad45ad418d04964",
          ],
        },
      },
      layers: [
        {
          id: "AbSCpBNGsX",
          source: "best",
          "source-layer": "municipalities",
          type: "fill",
          paint: {
            "fill-color": "rgb(239, 83, 80)",
            "fill-opacity": 1,
          },
          layout: {
            visibility: "visible",
          },
        },
        {
          id: "pWcaJKWYNZ",
          source: "best",
          "source-layer": "municipalities",
          type: "line",
          paint: {
            "line-color": "rgb(81, 45, 168)",
            "line-opacity": 1,
            "line-width": 1,
          },
          layout: {
            visibility: "visible",
          },
        },
      ],
    };
    setTimeout(() => {
      console.log(JSON.stringify(stylesd, 2));
      stylefunction(pms, stylesd, "best");
    }, 2000);
  },

  methods: {
    initMap: function () {
      this.view = new View({
        center: [595074, 6829276],

        zoom: 6,
      });
      this.map = new Map({
        layers: [
          // new TileLayer({
          //   source: new OSM(),
          // }),
        ],
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
    createVectorLayer: function () {
      if (this.styleObject.source_type === "geojson") {
        this.vectorLayer = new VectorLayer({
          source: new VectorSource(),
        });
        let features = new GeoJSON().readFeatures(this.styleObject.geojson, {
          featureProjection: "EPSG:3857",
        });

        // Setting id for SelectionInteraction
        features.forEach((feature, i) => {
          feature.setId(i);
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

        this.map.addLayer(this.vectorLayer);
        const key = source.on("change", () => {
          if (source.getState() === "ready") {
            const extent = source.getTileGrid().getExtent();
            this.zoomToExtent(extent);
            unByKey(key);

            setTimeout(() => {
              this.feature_attributes = Object.keys(
                this.vectorLayer
                  .getSource()
                  .getFeaturesInExtent(extent)[0]
                  .getProperties()
              );
            }, 6000);
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
    applyStyle: function (vectorlayer, stylejson, source_id) {
      stylefunction(
        this.vectorLayer,
        this.styleObject.getStyleAsJSON(),
        this.styleObject.source_id
      );
    },
  },
  watch: {
    styleObject: {
      handler() {
        if (this.vectorLayer) {
          this.applyStyle(
            this.vectorLayer,
            this.styleObject.getStyleAsJSON(),
            this.styleObject.source_id
          );
          console.log(this.styleObject.getStyleAsJSON());
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
