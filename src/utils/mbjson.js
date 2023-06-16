const rgbaToText = function (color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${
    Math.round(color.a * 10) / 10
  })`;
};

export default {
  rgbaToText,
};
