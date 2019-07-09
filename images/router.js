'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images', storage: multer.memoryStorage() });
const Image = require('./models');

const router = express.Router(); 

//app.use(express.static('public'));

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

router.get("/image.png", (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/image.png"));
  });

// router.get('/', (req, res) => {
//     Image.findByUserId(req.user._id).then()
//     // return a json list
//     // [ { _id: asdlkfj }, { _id: alskdjfa }, ....]
// });

// router.get('/:id', (req, res) => {
//     Image.findById(req.params.id).then(record => res.send(record.data));
// });


module.exports = router ; 