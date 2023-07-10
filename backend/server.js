const app = require("./app")
const { connectDatabase } = require("./config/database")

connectDatabase()

app.listen(process.env.PORT,() => {
    console.log(`Running Server on port ${process.env.PORT}`)
})