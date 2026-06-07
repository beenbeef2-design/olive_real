const fs = require('fs');
const path = require('path');

const dbDir = path.join(process.env.APPDATA, 'GitHub Desktop', 'IndexedDB', 'file__0.indexeddb.leveldb');

try {
  const files = fs.readdirSync(dbDir);
  console.log("Analyzing files in LevelDB for Korean paths...");

  for (let file of files) {
    const filePath = path.join(dbDir, file);
    if (!fs.statSync(filePath).isFile()) continue;

    const data = fs.readFileSync(filePath);
    
    // Convert to String using UTF-8 and UTF-16LE
    const encodings = ['utf8', 'utf16le'];
    const matches = [];

    for (let enc of encodings) {
      const text = data.toString(enc);
      
      // Matches standard Windows path pattern including Korean characters, spaces, and punctuation
      const regex = /[a-zA-Z]:\\[a-zA-Z0-9_\\\s\-\.가-힣ㄱ-ㅎㅏ-ㅣ]*/g;
      const found = text.match(regex) || [];
      matches.push(...found);
    }

    const filtered = matches.filter(str => {
      const lower = str.toLowerCase();
      return lower.includes('beauty') || lower.includes('new') || lower.includes('onedrive');
    });

    if (filtered.length > 0) {
      console.log(`\nMatches in file: ${file}`);
      Array.from(new Set(filtered.map(m => m.trim()))).forEach(m => console.log("- " + m));
    }
  }

} catch (err) {
  console.error("Error reading database:", err);
}
