import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'Express' })
})

export default router
