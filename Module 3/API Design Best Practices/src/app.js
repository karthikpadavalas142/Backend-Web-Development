const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');
function createApp() {
 const app = express(); app.use(express.json()); app.use('/', postRoutes); app.get('/_internal/failure', controller.explode);
 app.use((err, req, res, next) => { console.error(err); const status = err.statusCode || 500; return res.status(status).json({ error: { code: status === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: status === 404 ? 'Resource not found' : 'Internal server error' } }); });
 return app;
}
if (require.main === module) createApp().listen(3000, () => console.log('API listening on port 3000'));
module.exports = { createApp, resetData };
