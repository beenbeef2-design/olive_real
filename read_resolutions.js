const fs = require('fs');
const path = require('path');

function getMp4Resolution(filepath) {
  try {
    const data = fs.readFileSync(filepath);
    const tkhdIdx = data.indexOf(Buffer.from('tkhd'));
    if (tkhdIdx !== -1) {
      // tkhd atom starts at tkhdIdx - 4 (if size is 4 bytes)
      // but let's just use tkhdIdx which points to 'tkhd' (4 bytes)
      const version = data[tkhdIdx + 4];
      let offset;
      if (version === 1) {
        // version & flags (4) + creation (8) + modification (8) + track_id (4) + reserved (4) + duration (8) + reserved (8) + layer/alt (4) + volume/res (4) + matrix (36)
        offset = tkhdIdx + 4 + 4 + 8 + 8 + 4 + 4 + 8 + 8 + 4 + 4 + 36;
      } else {
        // version & flags (4) + creation (4) + modification (4) + track_id (4) + reserved (4) + duration (4) + reserved (8) + layer/alt (4) + volume/res (4) + matrix (36)
        offset = tkhdIdx + 4 + 4 + 4 + 4 + 4 + 4 + 8 + 4 + 4 + 36;
      }
      if (offset + 8 <= data.length) {
        const widthVal = data.readUInt32BE(offset);
        const heightVal = data.readUInt32BE(offset + 4);
        const width = widthVal >> 16;
        const height = heightVal >> 16;
        const widthFraction = widthVal & 0xFFFF;
        const heightFraction = heightVal & 0xFFFF;
        return { width: width + widthFraction / 65536, height: height + heightFraction / 65536, version };
      }
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

const workspaceDir = "c:\\Users\\wnals\\OneDrive\\바탕 화면\\new\\beauty-booth";
const femalePath = path.join(workspaceDir, "assets", "avatar_female.mp4");
const malePath = path.join(workspaceDir, "assets", "avatar_male.mp4");

console.log("Female video resolution:", getMp4Resolution(femalePath));
console.log("Male video resolution:", getMp4Resolution(malePath));
