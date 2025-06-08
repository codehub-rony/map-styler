import BaseLayer from "./BaseLayer.js";

class CircleLayer extends BaseLayer {
  constructor(label, source_id) {
    super(label, source_id, "circle");
    this.paint = {
      "circle-color": {
        value: { r: 232, g: 227, b: 223, a: 0.7 },
        component: { label: "color", type: "color_picker" },
      },
      "circle-radius": {
        value: 4,
        component: { label: "radius", type: "input_field" },
      },
      "circle-stroke-color": {
        value: { r: 54, g: 154, b: 204, a: 1 },
        component: { label: "stroke color", type: "color_picker" },
      },
      "circle-stroke-width": {
        value: 1,
        component: { label: "stroke width", type: "input_field" },
      },
    };
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}

export default CircleLayer;
