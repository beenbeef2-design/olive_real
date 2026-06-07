const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/repos/beenbeef2-design/olive_real/contents/assets',
  headers: {
    'User-Agent': 'NodeJS-Agent'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const files = JSON.parse(data);
      if (Array.isArray(files)) {
        console.log("Files in olive_real/assets on GitHub:");
        files.forEach(f => {
          console.log(`- Name: ${f.name}, Size: ${f.size} bytes`);
        });
      } else {
        console.log("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}).on('error', (err) => {
  console.error("HTTP Request Error:", err);
});
