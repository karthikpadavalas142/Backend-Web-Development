const store = require('../data/postStore');
function listPosts(query = {}) {
  const all = store.getAllPosts();
  const limit = Math.min( Number.parseInt(query.limit, 10) || 2, 50);
  const offset = Math.max(Number.parseInt(query.offset, 10) || 0, 0);
  return { rows: all.slice(offset, offset + limit), total: all.length, limit, offset };
}
function getPost(id) { return store.getPostById(id); }
function createPost(body = {}) { return store.createPost({ title: body.title, author: body.author }); }
function likePost(id) { const post = store.incrementLikes(id); if (!post) { const e = new Error('Post not found'); e.statusCode = 404; throw e; } return post; }
function explode() { const e = new Error('Internal operation failed'); e.statusCode = 500; throw e; }
module.exports = { listPosts, getPost, createPost, likePost, explode };
