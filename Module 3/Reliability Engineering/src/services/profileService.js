const DEFAULT_AVATAR = { url: 'https://cdn.aurora-profiles.dev/avatars/default.png', initials: '?', source: 'fallback' };
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function isRetryable(error) {
  if (!error) return false;
  if (error.name === 'AbortError') return true;
  const status = Number(error.status || error.statusCode || 0);
  if (status === 429 || status >= 500) return true;
  if (status >= 400 && status < 500) return false;
  return ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EAI_AGAIN', 'ENOTFOUND', 'ECONNABORTED'].includes(error.code);
}
async function withTimeout(operation, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await operation(controller.signal); }
  finally { clearTimeout(timer); }
}
async function withRetry(operation, options = {}) {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 25;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try { return await operation(); }
    catch (error) {
      if (attempt === maxAttempts - 1 || !isRetryable(error)) throw error;
      await sleep(baseDelayMs * (2 ** attempt));
    }
  }
}
async function getProfileWithAvatar(authorId, avatarClient, options = {}) {
  const timeoutMs = options.timeoutMs ?? 200;
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 25;
  try {
    const avatar = await withRetry(() => withTimeout(signal => avatarClient.getAvatar(authorId, { signal }), timeoutMs), { maxAttempts, baseDelayMs });
    return { authorId, avatar, degraded: false };
  } catch (error) { return { authorId, avatar: DEFAULT_AVATAR, degraded: true }; }
}
module.exports = { DEFAULT_AVATAR, sleep, isRetryable, withTimeout, withRetry, getProfileWithAvatar };
