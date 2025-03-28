
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {
  // integration Firebase Authentication pour l'inscription TODO
  res.json({ message: 'Inscription réussie!' });
});

router.post('/login', function(req, res) {
  // integration Firebase Authentication pour la connexion TODO
  res.json({ message: 'Connexion réussie!' });
});

module.exports = router;