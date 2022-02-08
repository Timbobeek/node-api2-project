// implement your posts router here

const Post = require('../posts/posts-model');

//option1
const router = require('express').Router()

//OR
//const express = require('express)
//const router = express.Router()

router.get('/api/posts', (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      })
    })
})

module.exports = router;