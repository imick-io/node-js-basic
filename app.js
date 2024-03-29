const http = require("http");
const routes = require("./routes");

// Create a server
const server = http.createServer(routes);
server.listen(3000);

// --- EVENT LOOP ---
// Node.js is single threaded
// But if Node.js is a single thread, how can it handle multiple requests at the same time?
// Node will send the longer operations to the background (Worker Pool) to do the eavy lifting and continue to execute the code

// So, if it is single threaded, is there a second thread? Like accessing the request and response from another request?

// Event loop iterations:
// - Timers (setInterval, setTimeout)
// - Pending Callbacks (execute I/O callbacks deferred to the next loop iteration)
// - Poll (retrieve new I/O events; execute I/O related callbacks; can also return to the timers phase)
// - Check (setImmediate)
// - Close Callbacks (execute all close event callbacks)
// - Exit or re-run
