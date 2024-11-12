import BaseLayer from "./BaseLayer.js";
class FillLayer extends BaseLayer {
  constructor(layer_label, source_id, default_style) {
    super(layer_label, source_id, "fill");
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

  setFromObject(styleobject) {
    console.log(styleobject.type !== "fill");
    if (styleobject.type !== "fill") {
      throw new Error("layer is not of type 'fill'");
    }
  }
}

export default FillLayer;
