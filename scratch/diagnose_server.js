const http = require('http');

function checkUrl(url) {
  http.get(url, (res) => {
    console.log(`URL: ${url}`);
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
    res.resume(); // Consume response data to free up memory
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

checkUrl('http://localhost:8090/index.html');
checkUrl('http://localhost:8090/assets/avatar_female.png');
checkUrl('http://localhost:8090/assets/avatar_female.mp4');
