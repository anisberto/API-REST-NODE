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
});

router.put('/posts/:id', async function(req, res) {
    const post = req.body;
    await postService.updatePost(req.params.id, post);
    res.end();
});

router.get('/posts/:id', async function(req, res) {
    const posts = await postService.getPost(req.params.id);
    res.json(posts);
});

router.delete('/posts/:id', async function(req, res) {
    await postService.deletePost(req.params.id);
    res.end();
});

module.exports = router;