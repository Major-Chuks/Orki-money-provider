/* eslint-disable @typescript-eslint/no-require-imports */
// fix-svg-attributes.js

const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

// Attributes to convert: kebab-case -> camelCase
const svgAttrMap = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "text-anchor": "textAnchor",
  "xlink:href": "xlinkHref",
  "xml:space": "xmlSpace",
  "clip-path": "clipPath",
  "fill-opacity": "fillOpacity",
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (file.endsWith(".tsx")) {
      callback(filepath);
    }
  });
}

function replaceSvgAttributes(content) {
  let updated = content;
  for (const [kebab, camel] of Object.entries(svgAttrMap)) {
    const regex = new RegExp(`\\b${kebab}\\s*=`, "g");
    updated = updated.replace(regex, `${camel}=`);
  }
  return updated;
}

function processFile(filepath) {
  const original = fs.readFileSync(filepath, "utf8");
  const updated = replaceSvgAttributes(original);
  if (original !== updated) {
    fs.writeFileSync(filepath, updated, "utf8");
    console.log(`✅ Updated: ${filepath}`);
  }
}

walkDir(ASSETS_DIR, processFile);
