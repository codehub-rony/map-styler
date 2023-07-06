import BaseLayer from "./BaseLayer.js";

class FillLayer extends BaseLayer {
  constructor(layer_name) {
    super(layer_name, "fill");
    this.property_groups = [
      {
        label: "fill",
        attributes: [
          {
            name: "fill-color",
            value: { r: 232, g: 227, b: 223, a: 0.7 },
            component: { label: "color", type: "color_picker" },
          },
        ],
      },
    ];
  }

  getStyleLayerObject() {
    return this.getStyleObject(this.property_groups);
  }
}
