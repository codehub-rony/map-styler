class BaseLayer {
  constructor(layer_name, source_id, type) {
    if (source_id === undefined) {
      throw new Error("Missing parameter: source_id");
    }
    this.id = `${layer_name}_${type}`;
    this.label = `default ${type}`
    this.source = source_id;
    this.type = type;
    this.filter = [];
  }
  getPaint(attributes) {
    let paint = {};
    attributes.forEach((attribute) => {
      if (attribute.component.type === "color_picker") {
        let op = attribute.name.slice(0, attribute.name.lastIndexOf("-"));
        paint[
          attribute.name
        ] = `rgb(${attribute.value.r}, ${attribute.value.g}, ${attribute.value.b})`;
        paint[`${op}-opacity`] = attribute.value.a;
      } else {
        paint[attribute.name] = attribute.value;
      }
    });
    return paint;
  }

  hasFilter() {
    return this.filter.length > 0
  }

  getStyleObject(attributes) {
    let styleObject = {
      id: this.id,
      source: this.source,
      type: this.type,
      paint: this.getPaint(attributes),
    }; 

    if (this.filter.length > 0) {
      styleObject['filter'] = this.filter
    }

    return styleObject 
  }
}

export default BaseLayer;
// module.exports = BaseLayer
