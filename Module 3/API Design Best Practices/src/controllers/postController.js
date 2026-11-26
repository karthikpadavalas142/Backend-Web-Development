const service = require('../services/postService');
const http = require('../utils/http');
function listPosts(req, res) { const result = service.listPosts(req.query); return http.sendList(res, result.rows, { total: result.total, limit: result.limit, offset: result.offset, hasMore: result.offset + result.rows.length < result.total }); }
function getPost(req, res) { const post = service.getPost(req.params.id); if (!post) return http.sendError(res, 404, { code: 'NOT_FOUND', message: 'Post not found' }); return http.sendOk(res, post); }
function createPost(req, res) { return http.sendCreated(res, service.createPost(req.body)); }
function likePost(req, res) { const post = service.likePost(req.params.id); return http.sendOk(res, { id: post.id, likes: post.likes }); }
function explode(req, res) { try { service.explode(); } catch (err) { return http.sendError(res, 500, { code: 'INTERNAL_ERROR', message: 'Internal server error' }); } }
module.exports = { listPosts, getPost, createPost, likePost, explode };
