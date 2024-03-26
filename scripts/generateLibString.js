const fs = require('fs');
const path = require('path');

// Path to your JavaScript library
const libPath = path.join(__dirname, './abcjs-min.js');
// Destination for the generated module
const outputPath = path.join(__dirname, '../src/assets/scripts/abcjsString.js');

// Read the file as a string
const abcjsLibraryString = fs.readFileSync(libPath, 'utf8');

// Generate the module
const moduleContent = `export default \`${abcjsLibraryString}\`;`;

// Write the module to disk
fs.writeFileSync(outputPath, moduleContent, 'utf8');

console.log('Library string module generated successfully.');
