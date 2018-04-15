var app = require('express')()
var fs = require('fs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var http = require('http').Server(app)
http.listen(8000, function () {
    console.log('listening on *:' + 8000);
})

app.post('/cruise', function (req, res) {
    var cruise = req.body.cruise;
    fs.readFile(__dirname + 'data/cruise.json', 'utf8', function (err, data) {

    })
})

app.post('/cruise/agent', function (req, res) {
    var agent = req.body.agent;
    fs.readFile(__dirname + 'data/cruise.json', 'utf8', function (err, data) {

    })
})