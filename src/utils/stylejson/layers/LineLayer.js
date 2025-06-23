import BaseLayer from "./BaseLayer.js";

class LineLayer extends BaseLayer {
  constructor(label, source_id, stylejson) {
    super(label, source_id, "line");

    this.paint = {
      "line-color": {
        value: { r: 0, g: 0, b: 0, a: 1 },
        component: { label: "stroke color", type: "color_picker" },
      },
      "line-width": {
        value: 1,
        component: { label: "stroke width", type: "input_field" },
      },
      "line-dasharray": {
        value: [0, 0],
        component: { label: "dash", type: "input_field_dasharray" },
      },
    };

    if (stylejson) {
      this.id = stylejson.id;
      this.name = stylejson.name;
      this.#loadFromStyleJSON(stylejson);
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
    if (stylejson.paint) {
      for (const key in this.paint) {
        if (this.paint.hasOwnProperty(key)) {
          if (key === "line-color") {
            this.paint[key].value = this.#parseRGB(
              stylejson.paint[key],
              stylejson.paint["line-opacity"]
            );
          } else {
            this.paint[key].value = stylejson.paint[key];
          }
        }
      }
    }
  }

  getStyleAsObject() {
    return this.getStyleObject();
  }
}
export default LineLayer;
