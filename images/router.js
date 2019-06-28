'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images', storage: multer.memoryStorage() });
const Image = require('./models');

const router = express.Router(); 

//app.use(express.static('public'));

router.post('/', upload.single('imageField'), (req, res) => {
    if(req.file) {
        const i = new Image({
            data: req.file.buffer,
            user: req.user
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

router.get('/', (req, res) => {
    Image.findByUserId(req.user._id).then()
    // return a json list
    // [ { _id: asdlkfj }, { _id: alskdjfa }, ....]
});

router.get('/:id', (req, res) => {
    Image.findById(req.params.id).then(record => res.send(record.data));
});


// Story:
// When you log in, you want to see all your images

// Corollaries
// A   - be able to search for images based on your user id
// A01 - you have to store the user id with each image when uploading
// B   - add endpoint to retrieve image (data) based on image id


/*
__________
|         |
| server   
|_________|

__________
|         |
| browser   
|_________|


After logging in:
- browser to fetch list of images that you have uploaded
-- there needs to be an api endpoint to support this - see Corollary A
- from that list, we have to generate the html that references the images (ex: <img src="/api/images/alskdjf" />)
- Corollary B - the API needs an endpoint to retrieve the image based on the ids

- FE needs a page that allows for uploading images - see corollary A01



*/

module.exports = router;
