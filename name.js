'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataPath = path.join(__dirname, 'names.json');

exports.get = cb => {
  readNames(cb);
};

function readNames(cb) {
  // read and parse
  fs.readFile(dataPath, (err, data) => {
    if(err) return cb(err);

    try {
      var names = JSON.parse(data);
    } catch(e) {
      var names = [];
    }

    cb(null, names);
  });
}

exports.single = (id,cb) => {
  readNames((err,names) => {
    if(err) return cb(err);
    var singleName = names.filter(name => name.id === id)
    cb(null,singleName)
  })

}


exports.update = (id, newObj, cb) =>{
  readNames((err, names) =>{
    if(err) return cb(err);

    var updated =  names.filter(value => value.id === id)
    updated = newObj;
    updated.id = id;
    names = names.filter(value => value.id !==id);
    names.push(updated)
    writeNames(names, cb);
  })
}

exports.create = (newObj, cb) => {
  readNames((err, names) => {
    if(err) return cb(err);

    let nameObj = {
      name: newObj.name,
      id: uuid(),
      message:newObj.message,
      author:newObj.author
    };

    names.push(nameObj);

    writeNames(names, cb);
  });
}

function writeNames(names, cb) {
  // stringify and write
  fs.writeFile(dataPath, JSON.stringify(names), cb);
}

exports.delete = (id, cb) => {
  readNames((err, names) => {
    if(err) return cb(err);

    // remove the name
    names = names.filter(nameObj => nameObj.id !== id);

    writeNames(names, cb);
  });
}
