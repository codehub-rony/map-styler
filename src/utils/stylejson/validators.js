export function isColorValid(colorObject) {
  if (typeof colorObject !== "object") {
    throw new Error(
      `colorObject should be an object with with r, g, b, a attributes. Received: ${colorObject}`
    );
  }

  const requiredKeys = ["r", "g", "b", "a"];
  for (let key of requiredKeys) {
    if (!(key in colorObject)) {
      throw new Error(`colorObject object is missing the ${key} attribute`);
    }
  }

  if (
    typeof colorObject.r !== "number" ||
    colorObject.r < 0 ||
    colorObject.r > 255
  ) {
    throw new Error("Red (r) must be a number between 0 and 255");
  }

  if (
    typeof colorObject.g !== "number" ||
    colorObject.g < 0 ||
    colorObject.g > 255
  ) {
    throw new Error("Green (g) must be a number between 0 and 255");
  }

  if (
    typeof colorObject.b !== "number" ||
    colorObject.b < 0 ||
    colorObject.b > 255
  ) {
    throw new Error("Blue (b) must be a number between 0 and 255");
  }

  if (
    typeof colorObject.a !== "number" ||
    colorObject.a < 0 ||
    colorObject.a > 1
  ) {
    throw new Error("Alpha (a) must be a number between 0 and 1");
  }

  if (Math.round(colorObject.a * 100) / 100 !== colorObject.a) {
    throw new Error("Alpha (a) must be rounded to 2 decimal places");
  }

  return true;
}
