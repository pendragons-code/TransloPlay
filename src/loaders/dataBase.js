const { QuickDB } = require("quick.db")
const db = new QuickDB({ filePath: "DataBase/db.sqlite" })
module.exports = { db }
