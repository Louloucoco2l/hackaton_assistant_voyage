import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// Initialiser Firebase Admin (à faire une seule fois dans votre application)
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const token = authHeader.split('Bearer ')[1];

    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;

    // Vérifier si l'utilisateur existe dans notre base de données
    // Cette étape est optionnelle mais recommandée

    next();
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    res.status(401).json({ error: 'Non autorisé' });
  }
};