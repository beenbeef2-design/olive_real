const fs = require('fs');
const filePath = 'c:\\Users\\wnals\\OneDrive\\바탕 화면\\new\\beauty-booth\\app.js';
const content = fs.readFileSync(filePath, 'utf8');

const marker = "// ========================================================\r\n// AI AVATAR ANIMATOR & CALIBRATION UI BINDING";
const marker2 = "// ========================================================\n// AI AVATAR ANIMATOR & CALIBRATION UI BINDING";

let index = content.indexOf(marker);
if (index === -1) {
  index = content.indexOf(marker2);
}

if (index !== -1) {
  const trimmed = content.substring(0, index).trim() + "\n";
  fs.writeFileSync(filePath, trimmed, 'utf8');
  console.log("Trimmed app.js successfully!");
} else {
  console.log("Marker not found in app.js");
}
