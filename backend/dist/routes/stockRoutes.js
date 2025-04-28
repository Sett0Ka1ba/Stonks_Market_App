"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const STOCK_API_BASE_URL = process.env.STOCK_API_URL || 'https://votre-api-boursiere.com/api';
const STOCK_API_KEY = process.env.STOCK_API_KEY || 'votre_clé_api';
// Route pour obtenir les données du marché
router.get('/market-data/:symbol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.params;
        console.log(`Recherche de données pour le symbole: ${symbol}`);
        const response = yield axios_1.default.get(`${STOCK_API_BASE_URL}/quotes?symbol=${symbol}`, {
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
    }
    catch (error) {
        console.error('Erreur lors de la récupétation des données:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
// Route pour récupérer les données historiques
router.get('/historical-data/:symbol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.params;
        const { period } = req.query;
        const response = yield axios_1.default.get(`${STOCK_API_BASE_URL}/historical?symbol=${symbol}&period=${period || 'month'}`, {
            headers: {
                'Authorization': `Bearer ${STOCK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const historicalData = response.data.map((dataPoint) => ({
            date: dataPoint.date,
            price: dataPoint.close,
            volume: dataPoint.volume
        }));
        res.json(historicalData);
    }
    catch (error) {
        console.error('Erreur lors de la récupération de l\'histotique de donées:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
// Route pour ajouter un favori 
router.post('/favorites', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.body;
        const userId = req.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if (!user.favorites.includes(symbol)) {
            user.favorites.push(symbol);
            yield user.save();
        }
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
// Route pour supprimer un favori
router.delete('/favorites/:symbol', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.params;
        const userId = req.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.favorites = user.favorites.filter(fav => fav !== symbol);
        yield user.save();
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        console.error('Erreur lors de la suppression des favoris:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
// Route pour obtenir les favoris d'un utilisateur
router.get('/favorites', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}));
// Route pour rechercher des actions 
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query || typeof query !== 'string' || query.length < 2) {
            return res.status(400).json({ message: 'La requête doit contenir au moins 2 caractères' });
        }
        const response = yield axios_1.default.get(`${STOCK_API_BASE_URL}/search?query=${query}`, {
            headers: {
                'Authorization': `Bearer ${STOCK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Erreur lors de la recherche:', error);
    }
}));
exports.default = router;
