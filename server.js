const express = require ('express')
const path = require ("path")
const https = require ('https')
const vhost = require ('vhost')

const PORT = 80 
var app = express()
var router = express.Router()
const fs = require('fs')

const bodyParser = require ('body-parser')

const GoogleSpreadsheet = require ('google-spreadsheet')
const { promisify } = require ('util')
const creds = require ('./client_secret.json')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get ('/', function (req, res) {
    const host = req.headers.host
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})

const ssl = {
    key: fs.readFileSync('ssl/kaderarnold_com.key'),
    cert: fs.readFileSync('ssl/kaderarnold_com.crt')
}

async function accessSpreadsheet (row) {
    const doc = new GoogleSpreadsheet ('1g1rlRfpDwMkoQCjQYDRu0tWOk0TTzPOAbvXcUHFXDh8')
    await promisify (doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)()
    const sheet = info.worksheets[0]

    await promisify(sheet.addRow)(row)
    //console.log(sheet)
}

async function secondAccess (row) {
    const doc = new GoogleSpreadsheet ('1g1rlRfpDwMkoQCjQYDRu0tWOk0TTzPOAbvXcUHFXDh8')
    await promisify (doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)()
    const sheet = info.worksheets[1]
    await promisify(sheet.addRow)(row)
}

var encodedParser = bodyParser.urlencoded({extended: false})

function clean (data) {
    data = data.replace("\\", "")
    data = data.replace("\\", "")
    data = data.replace("\"\"", "")
    data = data.replace("{", "")
    data = data.replace("}", "")
    data = data.replace(":", "")
    data = data.replace(",", "")
    data = data.replace("[", "")
    data = data.replace("]", "")
    data = data.replace("\"", "")
    data = data.replace("name", "")
    data = data.replace("age", "")
    data = data.replace("student", "")
    data = data.replace("email", "")

    return data
}

var count = 0
app.post('/', encodedParser, function (req, res) {

    if (!req.body) return res.sendStatus(400)

    if (count === 0) {
        var body = JSON.stringify(req.body)
        var data = clean(body)

        var li = data.split(":")
        let a = []
        for (var l of li) {
            if (l.length > 0) {
                if (l !== 'name' && l !== 'email' && l !== 'student' && l !== 'age') {
		    l = clean(l)
		    l = clean(l)
                    a.push(l)
                }
            }
        }

        var row = {
            email: a[0],
            name: a[1],
            student: a[2], 
            age: a[3]
        }

        accessSpreadsheet(row)
	console.log(row)
        count++;
    }
    else {
        var c = clean(JSON.stringify(req.body))
	c = clean(c)
	c = clean(c)
        var li = c.split("\"")
        var t = []
        for (var u of li ) {
            if (u.length > 0 && u != ':' && u != 'data'  && u.includes("data") == false &&  u != ",\\" && u!= "\\" && u!= ":\\" && u != 'name' && u != 'email' && u != 'age' && u != 'student') {
                t.push(u)
            }
        }
	c = clean(c)
	c = clean(c)
        
        var obj = {
            email: t[0],
            name: t[1],
            student: t[2],
            age: t[3],
            q1: t[4],
            q2: t[5],
            q3: t[6],
            q4: t[7],
            q5: t[8],
            q6: t[9],
            q7: t[10],
            q8: t[11],
            q9: t[12],
            q10: t[13],
            q11: t[14],
            q12: t[15],
            q13: t[16],
            q14: t[17],
            q15: t[18],
            q16: t[19],
            q17: t[20],
            q18: t[21],
            q19: t[22],
            q20: t[23],
            q21: t[24],
            q22: t[25],
            q23: t[26],
            q24: t[27],
            q25: t[28],
            q26: t[29],
            q27: t[30],
            q28: t[31],
            q29: t[32],
            q30: t[33],
            q31: t[34],
            q32: t[35],
            q33: t[36],
            q34: t[37],
            q35: t[38],
            q36: t[39],
            q37: t[40],
            q38: t[41],
            q39: t[42],
            q40: t[43]
        }
        console.log(obj)
        secondAccess(obj)
	count = 0
    }
    
})

app.listen(PORT)


const server = https.createServer(ssl, app) 
server.listen('443', function () {
    console.log ('serving https...')

})
