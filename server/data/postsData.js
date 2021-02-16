const database = require('../infra/database');
const { getPosts } = require('../service/postsService');

exports.getPosts = function() {
    return database.query('select * from blog.post');
};

exports.savePosts = function(post) {
    return database.one('insert into blog.post (title, content) values ($1,$2) returning *', [post.title, post.content]);
};

exports.deletePost = function(id) {
    return database.none('delete from blog.post where id = $1', [id])
};

exports.updatePost = function(id, post) {
    return database.none('update blog.post set content=$1, title=$2 where id = $3', [post.content, post.title, id]);
};

exports.getPost = function(id) {
    return database.oneOrNone('select * from blog.post where id = $1', [id]);
};