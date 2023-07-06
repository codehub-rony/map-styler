class BaseLayer {
  constructor(layer_name, type) {
    (this.id = `${layer_name}_${type}`),
      (this.source = layer_name),
      (this.type = type);
  }
  getPaint(property_groups) {
    let paint = {};
    property_groups.forEach((group) => {
      group.attributes.forEach((attribute) => {
        console.log(attribute.component.type);
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
    });
    return paint;
  }

  getStyleObject(property_groups) {
    return {
      id: this.id,
      source: this.source,
      type: this.type,
      paint: this.getPaint(property_groups),
    };
  }
}
