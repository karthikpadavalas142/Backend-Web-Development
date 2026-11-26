module.exports = function timing(req, res, next) {
  const started = Date.now();
  res.on('finish', () => console.log(`[${req.id || '-'}] ${req.method} ${req.path} took ${Date.now() - started}ms`));
  next();
};
