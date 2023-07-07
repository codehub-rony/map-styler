import BaseLayer from "./BaseLayer.js";

class LineLayer extends BaseLayer {
  constructor(layer_name) {
    super(layer_name, "line");
    this.attributes = [
      {
        name: "line-color",
        value: { r: 54, g: 154, b: 204, a: 1 },
        component: { label: "stroke color", type: "color_picker" },
      },

      {
        name: "line-width",
        value: 1,
        component: { label: "stroke width", type: "input_field" },
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}
export default LineLayer;
