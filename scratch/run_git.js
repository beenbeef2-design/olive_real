const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\wnals\\AppData\\Local\\GitHubDesktop';
const dirs = fs.readdirSync(baseDir);
const appDirs = dirs.filter(d => d.startsWith('app-'));

let gitPath = '';
appDirs.sort((a, b) => b.localeCompare(a));

for (let appDir of appDirs) {
  const checkPath = path.join(baseDir, appDir, 'resources', 'app', 'git', 'cmd', 'git.exe');
  if (fs.existsSync(checkPath)) {
    gitPath = checkPath;
    break;
  }
}

if (!gitPath) {
  console.error("git.exe not found");
  process.exit(1);
}

console.log("Found active Git path:", gitPath);

function runGit(args, cwd) {
  const cmd = `"${gitPath}" ${args}`;
  console.log(`Executing: ${cmd}`);
  try {
    const stdout = execSync(cmd, { 
      cwd, 
      encoding: 'utf8', 
      stdio: 'pipe',
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0' // Prevents hanging on auth popups
      }
    });
    console.log(stdout);
    return stdout;
  } catch (err) {
    console.error(`Error executing git: ${err.message}`);
    if (err.stdout) console.log("Stdout:", err.stdout);
    if (err.stderr) console.error("Stderr:", err.stderr);
    throw err;
  }
}

const targetCwd = 'c:\\Users\\wnals\\OneDrive\\바탕 화면\\new\\beauty-booth';

try {
  // Config credential helper globally/locally
  runGit('config credential.helper manager', targetCwd);
  
  // Try pushing again
  console.log("Pushing to GitHub with terminal prompts disabled...");
  runGit('push -u -f origin main', targetCwd);
  console.log("Git push process completed successfully!");

} catch (err) {
  console.error("Git automation pipeline failed. Possibly due to auth requirements.");
}
