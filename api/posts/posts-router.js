
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

router.post('/', (req, res) => {
  const { title, contents} = req.body;
  if(!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    })
  } else {
    Post.insert({title, contents})
      .then(({id})=>{
        return Post.findById(id)
      })
      .then(newPost => {
        res.status(201).json(newPost)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          error: err.message
        })
      })
  }
})

//--------------------PUT---------------------------

router.put('/:id', (req, res) => {
  const { title, contents} = req.body;
  if(!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    })
  } else {
    Post.findById(req.params.id)
      .then(stuff=>{
        if (!stuff){
          res.status(404).json({
            message: 'The post with the specified ID does not exist'
          })
        } else {
          return Post.update(req.params.id, req.body)
        }
      })
      .then(info => {
        if (info) {
          return Post.findById(req.params.id)
        }
      })
      .then(post =>{
        res.status(201).json(post)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          error: err.message
        })
      })
  }
})

//--------------------DELETE---------------------------

router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been removed' });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});



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