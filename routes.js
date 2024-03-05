const fs = require("fs");

function requestHandler(req, res) {
  const { url, method } = req;

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

  if (url === "/message" && method === "POST") {
    const body = [];
    // The first time this function is encountered, it will register an event listener
    // The data is streamed in in chunks
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // Merge all the chunk together
    // The first time this function is encountered, it will register an event listener
    // Node won't block and pause. It is registering an event listener (callback function)
    // This function will get executed on a future time. Node is registering this function and then it will continue to execute the code
    // We should return here because we don't want to execute the rest of the code below
    return req.on("end", () => {
      // We know it's text so we can use toString
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // This will block the code execution until the file is written
      // fs.writeFileSync("message.txt", message);

      // This will not block the code execution
      fs.writeFile("message.txt", message, (err) => {
        // Redirecting the user
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
}

module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };
