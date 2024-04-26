import BaseLayer from "./BaseLayer.js";
class FillLayer extends BaseLayer {
  constructor(style_name, source_id, default_style) {
    super(style_name, source_id, "fill");
    this.attributes = [
      {
        name: "fill-color",

        value: default_style
          ? { r: 255, g: 255, b: 255, a: 0.5 }
          : this.generateRGBAColor(),
        component: { label: "color", type: "color_picker" },
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}

export default FillLayer;
