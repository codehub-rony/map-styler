import Filter from "../Filter.js";

class BaseLayer {
  constructor(layer_label, source_id, type) {
    if (!source_id) {
      throw new Error("Missing parameter: source_id");
    }
    this.id = this.generateUniqueId();
    this._label = layer_label
      ? layer_label.replace("_", " ").toLowerCase()
      : `new ${type}`;
    this._source = source_id;
    this.type = type;
    this.filter = null;
    // consider setting the visibility param as true or false rather then strings.
    // Add conversio to string in export function
    this.layout = { visibility: "visible" };
  }

  get label() {
    return this._label;
  }

  set label(new_label) {
    this._label = new_label;
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

  get source() {
    return this._source;
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

  getVisibility() {
    if (this.layout.visibility === "none") {
      return false;
    } else {
      return true;
    }
  }

  getId() {
    return this.id;
  }

  getStyleObject(attributes) {
    let styleObject = {
      id: this.id,
      source: this._source,
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
