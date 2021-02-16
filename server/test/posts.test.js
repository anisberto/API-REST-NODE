const axios = require('axios');
const crypto = require('crypto');
const { getPosts } = require('../data/postsData');
const postService = require('../service/postsService')

const generate = function() {
    return crypto.randomBytes(20).toString('hex');
}

const request = function(url, method, data) {
    return axios({ url, method, data });
};

test('Should get posts', async function() {

    // given - Dado que 
    const post1 = await postService.savePosts({ title: generate(), content: generate() });
    const post2 = await postService.savePosts({ title: generate(), content: generate() });
    const post3 = await postService.savePosts({ title: generate(), content: generate() });
    const post4 = await postService.savePosts({ title: generate(), content: generate() });

    // When - Quando acontecer
    const response = await request('http://localhost:3000/posts', 'get');
    const posts = response.data;

    // The - Então
    expect(posts).toHaveLength(4);
    await postService.deletePost(post1.id);
    await postService.deletePost(post2.id);
    await postService.deletePost(post3.id);
    await postService.deletePost(post4.id);
});

test('Should save a posts', async function() {
    const data = { title: generate(), content: generate() };
    const response = await request('http://localhost:3000/posts', 'post', data);
    const post = response.data;
    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);
    await postService.deletePost(post.id);
});

test('Should update a post', async function() {
    const post = await postService.savePosts({ title: generate(), content: generate() });
    post.title = generate();
    post.content = generate();
    await request(`http://localhost:3000/posts/${post.id}`, 'put', post);

    const updatePost = await postService.getPost(post.id);
    expect(updatePost.title).toBe(post.title);
    expect(updatePost.content).toBe(post.content);
    await postService.deletePost(post.id);
});

test('Should delete a post', async function() {
    const post = await postService.savePosts({ title: generate(), content: generate() });
    await request(`http://localhost:3000/posts/${post.id}`, 'delete');

    await postService.deletePost(post.id);

    const posts = await postService.getPosts();
    expect(posts).toHaveLength(0);
});