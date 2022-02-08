// implement your server here
// require your posts router and connect it here

const express = require('express');

const server = express();

server.use(express.json());

const Post = require('./posts/posts-model');

server.get('/api/posts', (req, res) => {
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

module.exports = server;

