# the basics of Node.js

Any web developer should understand Node.js. and know how to use it. The goal of this small project is to show you how to use Node.js without express and how it works under the hood.

It's probably not a project that you would want to use in production, but it's a good starting point to understand how Node.js works.

## Configuration

The starting point of this project is the app.js file. It is responsible to create the server, register the routes and listen to a port.

## Create a server

With Node.js, unlike PHP or other server-side languages, you have to create your own server. This is done using the built-in `http module`. The server can get created using 3 differents syntaxes:

```javascript
// Using named a function
function rqListener(req, res) {}
http.createServer(rqListener);

// Using an anonymous function
http.createServer(function (req, res) {});

// Using an arrow function
http.createServer((req, res) => {});
```

## Package manager

This is great, but building a website or api with only plain Node.js can be a bit cumbersome. This is where package managers come in. They allow you to install and manage packages (or modules) for your project. The most popular package manager for Node.js is npm (Node Package Manager). It comes with Node.js when you install it.

Inside the package.json file, you can add any scripts you want. For now, let's add a start script that will run our server.js file. Add the following to your package.json file:

```json
"scripts": {
  "start": "node server.js"
}
```

### Installing packages

To install a package, you can use the npm install command. This will create a new directory called node_modules and download the package to that directory.

There are two types of packages you can install. Development dependencies are packages that are only needed during development, such as testing packages. To install a package as a development dependency, you can add the --save-dev flag to the install command. For example, to install the mocha testing framework, you would run npm install mocha --save-dev. You can also install packages globally by adding the -g flag to the install command.

### Using packages

When writting your code, you will experience a pretty anoying thing: you will have to rerun you server every time you make a change. This is where nodemon comes in. It is a package that will monitor for any changes in your source and automatically restart your server.

To install nodemon, run `npm install nodemon --save-dev`. Now, let's add a new script to our package.json file that will run our server with nodemon:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### The node_modules folder

When you install a package, it is placed in a directory called node_modules. This directory is created in the root of your project. It is best practice to add this directory to your .gitignore file, as you generally do not want to commit these files to your repository. Instead, you can add a package.json file to your repository, and when someone else clones your project, they can run npm install to get all the packages you have installed.

It will also install a package-lock.json file, which is a file that describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. This file is intended to be committed into source repositories, and serves various purposes:

- Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.
- Provide a facility for users to "time-travel" to previous states of node_modules without having to commit the directory itself.
- To facilitate greater visibility of tree changes through readable source control diffs.
- And optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages.

## Debugging

When developping a Node.js application, you will often need to debug your code. There are many ways to do this, but the easiest way is to use the built-in debugger in Node.js. Inside your IDE, you can set breakpoints and when running you application, it will stop at these breakpoints and you can inspect the state of your application.

To do so, inside VS Code, go to: `Run > Start Debugging`. You will also have to set breakpoints for the debugger to be useful.

### Having the debugger restart on file change

To have the debugger restart on file change, you can use nodemon. To do so, you can add a new configuration to your launch.json file:

```json
"configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "console": "integratedTerminal", // This will use the integrated terminal to run the debugger
    }
  ]
```

For this to work, you might have to install nodemon globally by running `npm install -g nodemon`.

# Deeper dive

Understanding the basics and how things work fundamentally is crucial. You don't want to just learn by heart how to use a framework or a library. You want to understand how it works under the hood.

## The event loop

Node.js is single-threaded. This means that it can only execute one thing at a time. This is why it is so important to write non-blocking code. This is where the event loop comes in. The event loop is what allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded.

Every loop iteration is called a tick. During each tick, the event loop checks for events and executes the appropriate callbacks.

The phases of the event loop are:

- **timers**: this phase executes callbacks scheduled by `setTimeout()` and `setInterval()`.
- **pending callbacks**: executes I/O callbacks deferred to the next loop iteration.
- **poll**: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and `setImmediate()`).
- **check**: `setImmediate()` callbacks are invoked here.
- **close callbacks**: some close callbacks, like `socket.on('close', ...)`, are executed here.
