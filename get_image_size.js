const fs = require('fs');
const path = require('path');

// Basic PNG size parser
function getPngSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature is 8 bytes
  // IHDR chunk starts at offset 8. Chunk length (4 bytes), Chunk type (4 bytes: "IHDR"), Width (4 bytes), Height (4 bytes)
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  return { width, height };
}

try {
  const femaleSize = getPngSize('c:\\Users\\wnals\\OneDrive\\바탕 화면\\new\\beauty-booth\\assets\\avatar_female.png');
  const maleSize = getPngSize('c:\\Users\\wnals\\OneDrive\\바탕 화면\\new\\beauty-booth\\assets\\avatar_male.png');
  console.log('Female Avatar Size:', femaleSize);
  console.log('Male Avatar Size:', maleSize);
} catch (err) {
  console.error(err);
}
