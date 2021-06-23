const GoogleSpreadsheet = require ('google-spreadsheet')
const { promisify } = require ('util')
const creds = require ('./client_secret.json')

const row = {
    student: 'Kader',
    name: 'Kevin',
    email: 'local@kader.email',
    age: '12'
}

async function accessSpreadsheet () {
    const doc = new GoogleSpreadsheet ('1g1rlRfpDwMkoQCjQYDRu0tWOk0TTzPOAbvXcUHFXDh8')
    await promisify (doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)()
    const sheet = info.worksheets[0]

    //await promisify(sheet.addRow)(row)
}

accessSpreadsheet()
