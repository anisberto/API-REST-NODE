const postsData = require('../data/postsData');

exports.getPosts = function() {
    return postsData.getPosts();
};

exports.savePosts = function(posts) {
    return postsData.savePosts(posts);
};

exports.deletePost = function(id) {
    return postsData.deletePost(id);
};

exports.updatePost = function(id, post) {
    return postsData.updatePost(id, post);
};

exports.getPost = function(id) {
    return postsData.getPost(id);
};