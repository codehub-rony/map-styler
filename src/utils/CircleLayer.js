import BaseLayer from "./BaseLayer.js";

class CircleLayer extends BaseLayer {
  constructor(layer_name) {
    super(layer_name, "circle");
    this.attributes = [
      {
        name: "circle-color",
        value: { r: 255, g: 255, b: 255, a: 0.5 },
        component: { label: "point color", type: "color_picker" },
      },

      {
        name: "circle-radius",
        value: 3,
        component: { label: " point radius", type: "input_field" },
      },

      {
        name: "circle-stroke-color",
        value: { r: 255, g: 255, b: 255, a: 0.5 },
        component: { label: "stroke color", type: "color_picker" },
      },

      {
        name: "circle-stroke-width",
        value: 3,
        component: { label: "stroke width", type: "input_field" },
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}

export default CircleLayer;
