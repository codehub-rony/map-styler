import Filter from "./Filter.js";

class BaseLayer {
  constructor(layer_name, source_id, type) {
    if (source_id === undefined) {
      throw new Error("Missing parameter: source_id");
    }
    this.id = this.generateUniqueId();
    this.label = layer_name ? layer_name : `default ${type}`;
    this.source = source_id;
    this.type = type;
    this.filter = null;
    this.layout = { visibility: "visible" };
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
    return this.filter ? true : false;
  }

  createFilter() {
    return new Filter();
  }

  setFilter(filter) {
    this.filter = filter;
  }

  generateUniqueId() {
    let id = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return id;
  }
  getRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  generateRGBAColor() {
    let r = this.getRandomInteger(255);
    let g = this.getRandomInteger(255);
    let b = this.getRandomInteger(255);

    return { r: r, g: g, b: b, a: 0.7 };
  }

  setVisibility(isVisible) {
    this.layout.visibility = isVisible ? "visible" : "none";
  }

  getId() {
    return this.id;
  }

  getStyleObject(attributes) {
    let styleObject = {
      id: this.id,
      source: this.source,
      type: this.type,
      paint: this.getPaint(attributes),
      layout: this.layout,
    };

    if (this.filter) {
      styleObject["filter"] = this.filter.getFilterAsArray();
    }

    return styleObject;
  }
}

export default BaseLayer;
