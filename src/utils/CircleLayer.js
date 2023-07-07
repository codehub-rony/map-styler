import BaseLayer from "./BaseLayer.js";

class CircleLayer extends BaseLayer {
  constructor(layer_name) {
    super(layer_name, "circle");
    this.property_groups = [
      {
        label: "point",
        attributes: [
          {
            name: "circle-color",
            value: { r: 255, g: 255, b: 255, a: 0.5 },
            component: { label: "color", type: "color_picker" },
          },

          {
            name: "circle-radius",
            value: 3,
            component: { label: "radius", type: "text_field" },
          },
        ],
      },
      {
        label: "stroke",
        attributes: [
          {
            name: "circle-stroke-color",
            value: { r: 255, g: 255, b: 255, a: 0.5 },
            component: { label: "color", type: "color_picker" },
          },

          {
            name: "circle-stroke-width",
            value: 3,
            component: { label: "width", type: "text_field" },
          },
        ],
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.property_groups);
  }
}

export default CircleLayer;
