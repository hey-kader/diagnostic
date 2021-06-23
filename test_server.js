const express = require ('express')
const path = require ("path")

const PORT = 3000 
const app = express()

const bodyParser = require ('body-parser')

const GoogleSpreadsheet = require ('google-spreadsheet')
const { promisify } = require ('util')
const creds = require ('./client_secret.json')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get ('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})

async function accessSpreadsheet (row) {
    const doc = new GoogleSpreadsheet ('1g1rlRfpDwMkoQCjQYDRu0tWOk0TTzPOAbvXcUHFXDh8')
    await promisify (doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)()
    const sheet = info.worksheets[0]

    await promisify(sheet.addRow)(row)
    //console.log(sheet)
}

var encodedParser = bodyParser.urlencoded({extended: false})

app.post('/', encodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var body = JSON.stringify(req.body)
    body = body.replaceAll("\\", "")
    body = body.replaceAll("{", "")
    body = body.replaceAll("}", "")
    body = body.replaceAll(":", "")
    body = body.replaceAll(",", "")
    var li = body.split("\"")
    let a = []
    for (var l of li) {
        if (l.length > 0) {
            if (l !== 'name' && l !== 'email' && l !== 'student' && l !== 'age') {
                a.push(l)
            }
        }
    }

    var row = {
        name: a[0],
        email: a[1],
        student: a[2], 
        age: a[3]
    }

    console.log(row)
    accessSpreadsheet(row)
    
})

app.listen(PORT)


