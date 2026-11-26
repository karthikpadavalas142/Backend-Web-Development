const postStore = require('../data/postStore');
exports.findAll = () => [...postStore.posts];
exports.findById = id => postStore.posts.find(post => post.id === Number(id)) || null;
exports.create = fields => { const post = { id: postStore.nextId(), title: fields.title, body: fields.body || '', authorId: fields.authorId }; postStore.posts.push(post); return post; };
exports.update = (id, patch) => { const post = exports.findById(id); if (!post) return null; if (patch.title !== undefined) post.title = patch.title; if (patch.body !== undefined) post.body = patch.body; return post; };
exports.remove = id => { const index = postStore.posts.findIndex(post => post.id === Number(id)); if (index < 0) return false; postStore.posts.splice(index, 1); return true; };
