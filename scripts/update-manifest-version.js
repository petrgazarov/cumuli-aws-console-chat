const fs = require("fs");
const path = require("path");
const packageJson = require("../package.json");

const manifestPath = path.join(__dirname, "../public/manifest.json");
const manifestJson = require(manifestPath);

manifestJson.version = packageJson.version;

fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');
