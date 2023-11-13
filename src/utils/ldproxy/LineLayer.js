import BaseLayer from "./BaseLayer.js";

class LineLayer extends BaseLayer {
  constructor(style_name, source_id) {
    super(style_name, source_id, "line");
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
