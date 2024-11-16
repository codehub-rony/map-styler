class BaseDataSource {
  constructor() {
    this._style_name = null;
    this._source_id = null;
    this._projection = "EPSG:3857";
    this._geometry_type = null;
    this._stylejson;
    this._fields;
  }
  get style_name() {
    return this._style_name;
  }
  get source_id() {
    return this._source_id;
  }

  get stylejson() {
    return this._stylejson;
  }

  get geometry_type() {
    return this._geometry_type;
  }

  get fields() {
    return this._fields;
  }

  set geometry_type(geometry_type) {
    this._geometry_type = this.standarizeGeometryType(geometry_type);
  }

  standarizeGeometryType(geom) {
    let geom_type = geom.toLowerCase();

    const polygon = ["polygon", "multipolygon", "polygons"];
    const line = ["linestring", "multilinestring", "lines"];
    const point = ["point", "points"];

    if (polygon.includes(geom_type)) {
      return "polygon";
    } else if (line.includes(geom_type)) {
      return "line";
    } else if (point.includes(geom_type)) {
      return "point";
    } else {
      throw new Error("Unknown geometry type");
    }
  }
}

export default BaseDataSource;
