
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser');
const app = express()

var path    = require("path");
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.collection('sample').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })

 
  app.post('/quotes', (req, res) => {
    db.collection('sample').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

  var db
  
  MongoClient.connect('mongodb://sameer:sameer@ds163656.mlab.com:63656/crud-node', (err, database) => {
    if (err) return console.log(err)
    db = database
  })


  app.put('/quotes', (req, res) => {
    // Handle put request
  })


  app.delete('/quotes', (req, res) => {
    db.collection('sample').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'A darth vadar quote got deleted'})
    })
  })

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
