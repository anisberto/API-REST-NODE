const express = require('express');
const router = express.Router();
const postService = require('../service/postsService');

router.get('/posts', async function(req, res) {
    const posts = await postService.getPosts();
    res.json(posts);
});

router.post('/posts', async function(req, res) {
    const post = req.body;
    const newPost = await postService.savePosts(post);
    res.json(newPost);
})

module.exports = router;