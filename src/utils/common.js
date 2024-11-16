const download_stylejson = function (styleObject) {
  let json = styleObject.getStyleAsJSON();
  const a = document.createElement("a");
  const file = new Blob([json], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = `${styleObject.stylejson.name}.mbs`;
  a.click();
};

export default {
  download_stylejson,
};
