
const Post = require('../posts/posts-model');


//option1
const router = require('express').Router()

//OR
//const express = require('express)
//const router = express.Router()

//--------------------GET w/o comments---------------------------

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
          res.status(404).json({
            message: "The post with the specified ID does not exist"
          })
        }
        res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: err.message
      })
    })
})

//--------------------POST---------------------------




//--------------------GET w/ comments---------------------------

router.get('/:id/comments', (req, res) => {
  Post.findPostComments(req.params.id)
    .then(coms => {
      if (coms.length > 0) {
        res.status(200).json(coms);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The comments information could not be retrieved',
      });
    });
});





module.exports = router;