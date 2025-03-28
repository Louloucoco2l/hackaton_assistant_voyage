const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assistant Personnel de Voyage' });
});

router.get('/api', (req, res) => {
  res.json({ message: 'API de l\'assistant de voyage fonctionne!' });
});

module.exports = router;




