'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images', storage: multer.memoryStorage() });
const Image = require('./models');


const router = express.Router(); 

const jsonParser = bodyParser.json();
//app.use(express.static('public'));
// router.use(bodyParser()); 

router.post('/', upload.single('imageField'), (req, res) => {
    if(req.file) {
        console.error(req.file);
        const i = new Image({
            data: req.file.buffer
        });
        i.save().then(() => {
            return res.status(201).json({
                id: i._id
            });
        }).catch(e => {
            console.error(e);
            return res.status(500).json({ message: 'error: ' + e.message})
        });
    }
    else {
        throw 'error';
    }
});


router.get('/', jsonParser, (req, res) => {
    Image.find({ user: req.user._id }).then(data => res.json(data.map(image => image._id)))
    // return a json list
    // [ { _id: asdlkfj }, { _id: alskdjfa }, ....]
});

router.get('/:id', (req, res) => {
    Image.findById(req.params.id).then(record => res.end(record.data));
});


module.exports = router ; 
//	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibWF0dHAifSwiaWF0IjoxNTY0NjE1Nzc1LCJleHAiOjE1NjUyMjA1NzUsInN1YiI6Im1hdHRwIn0.W2SSwLLEHhah0gdOK_bpaLNu5P1Jtkid2w71OFTg-5c