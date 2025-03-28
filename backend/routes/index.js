const express = require('express');
const router = express.Router();

// API bateau (bateau qui flotte pas)
router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

module.exports = router;