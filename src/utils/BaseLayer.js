class BaseLayer {
  constructor(layer_name, source_id, type) {
    this.id = `${layer_name}_${type}`;
    this.source = source_id;
    this.type = type;
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

  getStyleObject(attributes) {
    return {
      id: this.id,
      source: this.source,
      type: this.type,
      paint: this.getPaint(attributes),
    };
  }
}

export default BaseLayer;
