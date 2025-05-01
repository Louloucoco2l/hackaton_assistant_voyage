import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

console.log('Test des variables d\'environnement:');
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? '✅ Présente' : '❌ Manquante');
console.log('Longueur de la clé:', process.env.OPENWEATHER_API_KEY?.length);