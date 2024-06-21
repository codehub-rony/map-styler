import BaseLayer from "./BaseLayer.js";

class LineLayer extends BaseLayer {
  constructor(style_name, source_id) {
    super(style_name, source_id, "line");
    this.attributes = [
      {
        name: "line-color",
        value: { r: 0, g: 0, b: 0, a: 1 },
        component: { label: "stroke color", type: "color_picker" },
      },
      {
        name: "line-width",
        value: 1,
        component: { label: "stroke width", type: "input_field" },
      },
      {
        name: "line-dasharray",
        value: [0, 0],
        component: {
          label: "dash pattern",
          type: "input_field_dasharray",
        },
        set: function (idx, value) {
          this.value[idx] = value;
        },
      },
    ];
  }

  getStyleAsObject() {
    return this.getStyleObject(this.attributes);
  }
}
export default LineLayer;
