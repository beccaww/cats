'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});


const app = express();
const router = express.Router(); 

//app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});


module.exports = router ; 