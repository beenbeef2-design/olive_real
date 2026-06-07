const fs = require('fs');
const path = require('path');

const chromeHistoryPath = path.join(
  process.env.USERPROFILE,
  'AppData',
  'Local',
  'Google',
  'Chrome',
  'User Data',
  'Default',
  'History'
);

// We need to copy the file to read it because Chrome might have a lock on it
const tempHistoryPath = path.join(__dirname, 'temp_History');

try {
  if (!fs.existsSync(chromeHistoryPath)) {
    console.log("Chrome history file not found:", chromeHistoryPath);
    process.exit(1);
  }

  // Copy file to bypass file lock
  fs.copyFileSync(chromeHistoryPath, tempHistoryPath);

  const data = fs.readFileSync(tempHistoryPath);
  const text = data.toString('utf8');

  // Search for onrender.com URLs using a loose printable characters matching pattern
  const regex = /https?:\/\/[^\s\x00-\x1F\x7F]*?onrender\.com[^\s\x00-\x1F\x7F]*/gi;
  const matches = text.match(regex) || [];

  const uniqueMatches = Array.from(new Set(matches.map(m => {
    // Strip trailing binary debris often present in SQLite strings
    const match = m.replace(/[^\x20-\x7E].*$/, '');
    return match;
  })));

  console.log("Found Render URLs:");
  uniqueMatches.forEach(url => console.log("- " + url));

  // Also search for github.com URLs
  const ghRegex = /https?:\/\/github\.com\/beenbeef2-design\/[^\s\x00-\x1F\x7F]*/gi;
  const ghMatches = text.match(ghRegex) || [];
  const uniqueGHMatches = Array.from(new Set(ghMatches.map(m => {
    return m.replace(/[^\x20-\x7E].*$/, '');
  })));

  console.log("\nFound GitHub URLs:");
  uniqueGHMatches.forEach(url => console.log("- " + url));

} catch (err) {
  console.error("Error reading history:", err);
} finally {
  if (fs.existsSync(tempHistoryPath)) {
    fs.unlinkSync(tempHistoryPath);
  }
}
