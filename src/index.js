const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const ssrRouter = require('./routes/ssrRouter').router
const bookRouter = require('./routes/bookRouter').router

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))
app.use('/api/books', bookRouter)
app.use('/', ssrRouter)

app.listen(port, ()=> {
    console.log("Jakas wiadomosc: "+port)
})
