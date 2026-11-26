function sendList(res, rows, meta = {}) { return res.status(200).json({ data: rows, meta }); }
function sendCreated(res, data) { return res.status(201).json({ data }); }
function sendOk(res, data) { return res.status(200).json({ data }); }
function sendError(res, status, payload = {}) { return res.status(status).json({ error: { code: payload.code || (status === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR'), message: payload.message || 'Request failed' } }); }
module.exports = { sendList, sendCreated, sendOk, sendError };
