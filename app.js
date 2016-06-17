'use strict';

const PORT = process.env.PORT || 8000;

////// REQUIRES //////

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Name = require('./name');

////// APP DECLARATION //////

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  // let indexPath = path.join(__dirname, 'index.html');
  // res.sendFile(indexPath);
  console.log("get");
});

app.get('/names', function(req,res){
  Name.get(function(err,names){
    if(err) return res.status(400).send(err);
    res.send(names)
  })
})

/////////////////////////////////
app.get('/names/:id', function(req,res){
  Name.single(req.params.id, function(err,names){
    if(err) return res.status(400).send(err);
    res.send(names)
  })
})



///////*3 ==\




app.post('/names', function(req, res) {
  Name.create(req.body, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.put('/names/:id', function(req,res){
  Name.update(req.params.id, req.body, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });

})

app.delete('/names/:id', (req, res) => {
  Name.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
