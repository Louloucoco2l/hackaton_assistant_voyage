require('dotenv').config();
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
dotenv.config(); // Charge les variables d'environnement depuis .env

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestion des erreurs
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
