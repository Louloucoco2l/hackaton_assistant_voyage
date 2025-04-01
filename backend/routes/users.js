import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Créer un nouvel utilisateur
router.post('/users', async (req, res) => {
  try {
    const { id, email, displayName, photoURL } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO users (id, email, display_name, photo_url) VALUES (?, ?, ?, ?)',
      [id, email, displayName || null, photoURL || null]
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Obtenir les informations d'un utilisateur
router.get('/users/:id', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, email, display_name, photo_url, created_at, last_login, phone, address, preferences FROM users WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour la date de dernière connexion
router.put('/users/:id/login', async (req, res) => {
  try {
    await pool.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [req.params.id]
    );

    res.json({ message: 'Date de connexion mise à jour' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la date de connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour le profil utilisateur
router.put('/users/:id', verifyToken, async (req, res) => {
  try {
    const { displayName, phone, address, preferences } = req.body;

    await pool.execute(
      'UPDATE users SET display_name = ?, phone = ?, address = ?, preferences = ? WHERE id = ?',
      [displayName, phone, address, JSON.stringify(preferences), req.params.id]
    );

    res.json({ message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;