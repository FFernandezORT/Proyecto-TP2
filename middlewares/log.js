export function log(req, res, next) {
  console.log(`🚀 ~ log ~ req:`, req.url);
  next();
}