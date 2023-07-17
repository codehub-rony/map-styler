import BaseLayer from "./BaseLayer.js";
class FillLayer extends BaseLayer {
  constructor(style_name, source_id) {
    super(style_name, source_id, "fill");
    this.attributes = [
      {
        name: "fill-color",
        value: { r: 232, g: 227, b: 223, a: 0.7 },
        component: { label: "color", type: "color_picker" },
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}

export default FillLayer;
