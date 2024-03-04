const http = require("http");
const fs = require("fs");

// --- CREATE SERVER ---
// This request will run for every request that comes in for the server
function rqListener(req, res) {}
http.createServer(rqListener);

// OR (anonymous function)
http.createServer(function (req, res) {});

// OR (arrow function)
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  // Home page
  if (url === "/") {
    //   Sending HTML Code
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && req.method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");

  // CTRL + C to stop the server
  //   process.exit(); // This will stop the server
});

server.listen(3000);
