import express, { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

const STOCK_API_BASE_URL = process.env.STOCK_API_URL || 'https://votre-api-boursiere.com/api';
const STOCK_API_KEY = process.env.STOCK_API_KEY || 'votre_clé_api';

// Route pour obtenir les données du marché
router.get('/market-data/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    console.log(`Recherche de données pour le symbole: ${symbol}`);
    
    const response = await axios.get(`${STOCK_API_BASE_URL}/quotes?symbol=${symbol}`, {
      headers: {
        'Authorization': `Bearer ${STOCK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Adapter la réponse de l'API au format attendu par votre frontend
    const stockData = {
      symbol: symbol,
      price: response.data.price || response.data.lastPrice,
      change: response.data.change || response.data.changePercent,
      volume: response.data.volume || 0,
    };
    
    res.json(stockData);
  } catch (error) {
    console.error('Erreur lors de la récupétation des données:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour récupérer les données historiques
router.get('/historical-data/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const { period } = req.query;
    
    const response = await axios.get(
      `${STOCK_API_BASE_URL}/historical?symbol=${symbol}&period=${period || 'month'}`,
      {
        headers: {
          'Authorization': `Bearer ${STOCK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const historicalData = response.data.map((dataPoint: any) => ({
      date: dataPoint.date,
      price: dataPoint.close,
      volume: dataPoint.volume
    }));
    
    res.json(historicalData);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'histotique de donées:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour ajouter un favori 
router.post('/favorites', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { symbol } = req.body;
    const userId = (req as any).userId; 
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    if (!user.favorites.includes(symbol)) {
      user.favorites.push(symbol);
      await user.save();
    }
    
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour supprimer un favori
router.delete('/favorites/:symbol', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const userId = (req as any).userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    user.favorites = user.favorites.filter(fav => fav !== symbol);
    await user.save();
    
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Erreur lors de la suppression des favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir les favoris d'un utilisateur
router.get('/favorites', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({ favorites: user.favorites });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour rechercher des actions 
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string' || query.length < 2) {
      return res.status(400).json({ message: 'La requête doit contenir au moins 2 caractères' });
    }
    
    const response = await axios.get(`${STOCK_API_BASE_URL}/search?query=${query}`, {
      headers: {
        'Authorization': `Bearer ${STOCK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    
  }
});

export default router;
