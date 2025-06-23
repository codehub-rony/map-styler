import { isColorValid } from "../src/utils/stylejson/validators.js";

describe("isColorValid", () => {
  it("should pass with a valid color object", () => {
    const validColor = { r: 255, g: 255, b: 255, a: 0.27 };
    expect(() => isColorValid(validColor)).not.toThrow();
  });

  it("should throw an error if the color is missing the r, g, b, or a keys", () => {
    const invalidColor1 = { r: 255, g: 255, b: 255 };
    expect(() => isColorValid(invalidColor1)).toThrow(
      "colorObject object is missing the a attribute"
    );

    const invalidColor2 = { r: 255, g: 255, a: 0.5 };
    expect(() => isColorValid(invalidColor2)).toThrow(
      "colorObject object is missing the b attribute"
    );

    const invalidColor3 = { b: 255, g: 255, a: 0.5 };
    expect(() => isColorValid(invalidColor3)).toThrow(
      "colorObject object is missing the r attribute"
    );

    const invalidColor4 = { b: 255, r: 255, a: 0.5 };
    expect(() => isColorValid(invalidColor4)).toThrow(
      "colorObject object is missing the g attribute"
    );
  });

  it("should throw an error if any of r, g, or b are not valid numbers between 0 and 255", () => {
    const invalidColor1 = { r: -1, g: 255, b: 255, a: 1 };
    expect(() => isColorValid(invalidColor1)).toThrow(
      "Red (r) must be a number between 0 and 255"
    );

    const invalidColor2 = { r: 255, g: 300, b: 255, a: 1 };
    expect(() => isColorValid(invalidColor2)).toThrow(
      "Green (g) must be a number between 0 and 255"
    );

    const invalidColor3 = { r: 255, g: 255, b: -5, a: 1 };
    expect(() => isColorValid(invalidColor3)).toThrow(
      "Blue (b) must be a number between 0 and 255"
    );
  });

  it("should throw an error if alpha (a) is not a number between 0 and 1", () => {
    const invalidColor1 = { r: 255, g: 255, b: 255, a: -0.1 };
    expect(() => isColorValid(invalidColor1)).toThrow(
      "Alpha (a) must be a number between 0 and 1"
    );

    const invalidColor2 = { r: 255, g: 255, b: 255, a: 1.5 };
    expect(() => isColorValid(invalidColor2)).toThrow(
      "Alpha (a) must be a number between 0 and 1"
    );
  });

  it("should throw an error if alpha (a) is not rounded to 2 decimal places", () => {
    const invalidColor = { r: 255, g: 255, b: 255, a: 0.123 };
    expect(() => isColorValid(invalidColor)).toThrow(
      "Alpha (a) must be rounded to 2 decimal places"
    );
  });

  it("should throw an error if the color is not an object", () => {
    const invalidColor1 = "invalid";
    expect(() => isColorValid(invalidColor1)).toThrow(
      `colorObject should be an object with with r, g, b, a attributes. Received: ${invalidColor1}`
    );

    const invalidColor2 = 123;
    expect(() => isColorValid(invalidColor2)).toThrow(
      `colorObject should be an object with with r, g, b, a attributes. Received: ${invalidColor2}`
    );
  });
});
