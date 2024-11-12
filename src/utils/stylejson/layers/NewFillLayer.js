import BaseLayer from "./BaseLayer.js";

class NewFillLayer extends BaseLayer {
  constructor(styleObject) {
    if (typeof styleObject !== "object") {
      throw new Error("Input is not of type 'object'");
    }

    if (!styleObject["source"]) {
      throw new Error("required attribute 'source' is undefined");
    }

    if (styleObject["type"] !== "fill") {
      throw new Error("layer is not of type 'fill'");
    }

    super(styleObject["label"], styleObject["source"], styleObject["type"]);

    this.paint = #init_paint()
  }

  #parse_paint(paintObject) {

    return {'fill-opacity'}

  }
}

export default NewFillLayer;

// import BaseLayer from "./BaseLayer.js";
// class FillLayer extends BaseLayer {
//   constructor(layer_label, source_id, default_style) {
//     super(layer_label, source_id, "fill");
//     this.attributes = [
//       {
//         name: "fill-color",

//         value: default_style
//           ? { r: 255, g: 255, b: 255, a: 0.5 }
//           : this.generateRGBAColor(),
//         component: { label: "color", type: "color_picker" },
//       },
//     ];
//   }

//   getStyleAsObject() {
//     return this.getStyleObject(this.attributes);
//   }

//   setFromObject(styleobject) {
//     console.log(styleobject.type !== "fill");
//     if (styleobject.type !== "fill") {
//       throw new Error("layer is not of type 'fill'");
//     }
//   }
// }

// export default FillLayer;
