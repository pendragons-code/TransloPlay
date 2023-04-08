const webserver = require("./src/loaders/webserver.js")
console.log("Running App!")
const { io } = require("./src/loaders/socketManager.js")
console.log("Starting socket!")
const { db } = require("./src/loaders/dataBase.js")
console.log("Starting db!")
// Trying to figure out order of operations. The webserver and socketManager was a lot more slower than the db!
