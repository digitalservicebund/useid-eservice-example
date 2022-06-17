const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Embedding widget here' });
});

router.get('/success/:id', (req, res) => {
  const id = req.params.id;
  res.render('index', { title: `Success page for ID ${id}` });
});

module.exports = router;
