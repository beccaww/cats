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
    Image.findByUserId(req.user._id).then(data => res.json(data))
    // return a json list
    // [ { _id: asdlkfj }, { _id: alskdjfa }, ....]
});

router.get('/:id', (req, res) => {
    Image.findById(req.params.id).then(record => res.send(record.data));
});


module.exports = router ; 