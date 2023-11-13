import { expect } from "chai";
import StyleJSON from "./src/utils/StyleJSON.js";
import demo_data from "./src/utils/demo_data.js";

describe("StyleJSON",  () => {
  describe("Initialize Class instance", () => {
    it("returns correct object based on data_source type", () => {
      let geometry_type = "polygon";
      const style = new StyleJSON.GeojsonStyle(
        "buildings",
        "buildings",
        geometry_type,
        demo_data.asString()
      );
      expect(style instanceof StyleJSON.GeojsonStyle).to.equal(true);
    });
  });
});
