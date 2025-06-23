import BaseLayer from "./BaseLayer.js";
class FillLayer extends BaseLayer {
  constructor(layer_label, source_id, stylejson) {
    super(layer_label, source_id, "fill");

    this.paint = {
      "fill-color": {
        value: { r: 255, g: 255, b: 255, a: 0.27 },
        component: { label: "fill color", type: "color_picker" },
      },
    };

    if (stylejson) {
      this.id = stylejson.id;
      this.name = stylejson.name;
      this.#loadFromStyleJSON(stylejson);

      if (stylejson.filter) {
        this.createFilterFromJSON(stylejson.filter);
      }
    }
  }

  #parseRGB(colorString, opacity) {
    const match = colorString.match(
      /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
    );
    if (!match) {
      throw new Error("Invalid RGB format");
    }
    const [_, r, g, b] = match.map(Number);
    return { r: r, g: g, b: b, a: opacity };
  }

  #loadFromStyleJSON(stylejson) {
    this.paint["fill-color"].value = this.#parseRGB(
      stylejson.paint["fill-color"],
      stylejson.paint["fill-opacity"]
    );
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}

export default FillLayer;
