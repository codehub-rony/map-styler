import BaseLayer from "./BaseLayer.js";

class LineLayer extends BaseLayer {
  constructor(layer_name) {
    super(layer_name, "line");
    this.property_groups = [
      {
        label: "line",
        attributes: [
          {
            name: "line-color",
            value: { r: 54, g: 154, b: 204, a: 1 },
            component: { label: "color", type: "color_picker" },
          },

          {
            name: "line-width",
            value: 1,
            component: { label: "width", type: "text_field" },
          },
        ],
      },
    ];
  }

  getStyleLayerObject() {
    return this.getStyleObject(this.property_groups);
  }
}
