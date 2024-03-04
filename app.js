const http = require("http");

// --- CREATE SERVER ---
// This request will run for every request that comes in for the server
function rqListener(req, res) {}
http.createServer(rqListener);

// OR (anonymous function)
http.createServer(function (req, res) {});

// OR (arrow function)
http.createServer((req, res) => {});
