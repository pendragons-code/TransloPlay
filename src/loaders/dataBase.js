const { QuickDB } = require("quick.db")
const db = new QuickDB({ filePath: "DataBase/db.sqlite" })

// Did this out of habit because I like to separate the database init from the webserver.
// Usually I would use something like mongodb and cassandra.
//
// Not gonna lie if people really want me to combine socketManager.js, frontEnd.js, and dataBase.js into webserver.js. I will. So far I have only been getting questions.
// That said, I do agree that having an app.js file hanging on is really stupid.
module.exports = { db }
