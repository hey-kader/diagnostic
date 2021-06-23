const express = require ('express')
const path = require ("path")

const PORT = 3000 
const app = express()

const bodyParser = require ('body-parser')

app.use(express.static(path.join(__dirname, 'build')))

app.get ('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})

var encodedParser = bodyParser.urlencoded({extended: false})

app.post('/', encodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body)
})

app.listen(PORT)

