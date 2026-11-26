const crypto = require('crypto');
const sessions = new Map();
const TTL = Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000);
function create(userId) {
  const id = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + TTL;
  sessions.set(id, { userId, expiresAt });
  return id;
}
function get(id) {
  const session = sessions.get(id);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) { sessions.delete(id); return null; }
  return session;
}
function destroy(id) { sessions.delete(id); }
module.exports = { create, get, destroy, _store: sessions };
