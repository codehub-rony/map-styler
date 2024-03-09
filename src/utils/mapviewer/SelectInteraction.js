import Select from "ol/interaction/Select.js";
import { Fill, Stroke, Style } from "ol/style.js";

class GeoJson {
  constructor() {
    this.style = new Style({
      fill: new Fill({
        color: "#eeeeee",
      }),
      stroke: new Stroke({ color: "rgba(218, 22, 22, 0.7)", width: 3 }),
    });
    this.selectStyle = (feature) => {
      const color = feature.get("COLOR") || "#eeeeee";
      this.style.getFill().setColor(color);
      return this.style;
    };

    return new Select({ style: this.selectStyle });
  }
}

class SelectInteraction {
  constructor(source_type) {
    if (source_type === "geojson") {
      return new GeoJson();
    } else {
      throw new Error(`Select interaction is not supported for ${source_type}`);
    }
  }
}

export default SelectInteraction;
