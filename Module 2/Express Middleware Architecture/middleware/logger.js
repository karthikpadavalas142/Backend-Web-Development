module.exports = function logger(req, res, next) {
  res.on('finish', () => console.log(`[${req.id || '-'}] ${req.method} ${req.path} ${res.statusCode}`));
  next();
};
