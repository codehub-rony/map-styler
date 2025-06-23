import Filter from "../Filter.js";
import { isColorValid } from "../validators.js";

class BaseLayer {
  constructor(layer_name, source_id, layer_type) {
    if (!source_id) {
      throw new Error("Missing parameter: source_id");
    }
    this.id = this.generateUniqueId();
    this._name = layer_name
      ? layer_name.replace("_", " ")
      : `new ${layer_type}`;
    this.source = source_id;
    this.type = layer_type;
    this.filter = null;
    // consider setting the visibility param as true or false rather then strings.
    // Add conversio to string in export function
    this.layout = { visibility: "visible" };
  }

  get name() {
    return this._name;
  }

  set name(new_name) {
    this._name = new_name;
  }

  formatPaintAsStyleJSON() {
    let formatted_paint = {};

    Object.keys(this.paint).forEach((key) => {
      if (this.paint[key].component.type === "color_picker") {
        formatted_paint[
          key
        ] = `rgb(${this.paint[key].value.r}, ${this.paint[key].value.g}, ${this.paint[key].value.b})`;

        if (this.paint[key].value.a) {
          let layer_type = key.split("-")[0];

          formatted_paint[`${layer_type}-opacity`] = this.paint[key].value.a;
        }
      } else {
        formatted_paint[key] = this.paint[key].value;
      }
    });

    return formatted_paint;
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

  createFilterFromJSON(json) {
    let filter = new Filter();

    json.forEach((filter_properties, i) => {
      if (i > 0) {
        filter.createCondition(
          filter_properties[0],
          filter_properties[1],
          filter_properties[2]
        );
      }
    });

    this.setFilter(filter);
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
    if (typeof isVisible !== "boolean") {
      throw new Error("Input must be a boolean value");
    }
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

  getStyleObject() {
    let styleObject = {
      id: this.id,
      name: this._name,
      source: this.source,
      type: this.type,
      paint: this.paint,
      layout: this.layout,
    };

    if (this.filter) {
      styleObject["filter"] = this.filter.getFilterAsArray();
    }

    return styleObject;
  }

  getStyleAsJSON() {
    let stylejson = {
      id: this.id,
      name: this._name,
      source: this.source,
      type: this.type,
      paint: this.formatPaintAsStyleJSON(),
      layout: this.layout,
    };

    if (this.filter) {
      stylejson["filter"] = this.filter.getFilterAsArray();
    }

    return stylejson;
  }

  setColor(color, key) {
    if (isColorValid(color)) {
      if (this.paint[key].component.type !== "color_picker") {
        throw new Error("Color can only be set on color_picker component type");
      }
      this.paint[key].value.r = color.r;
      this.paint[key].value.g = color.g;
      this.paint[key].value.b = color.b;
      this.paint[key].value.a = color.a;
    }
  }
}

export default BaseLayer;
