import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { StockData } from '../types';
import StockChart from './StockChart';

const StockMarket: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchStock = async () => {
    if (!searchQuery) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/stocks/market-data/${searchQuery}`);
      setStockData(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des données du marché');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async () => {
    if (!stockData) return;
    
    try {
      await api.post('/stocks/favorites', { symbol: stockData.symbol });
      alert('Ajouté aux favoris !');
    } catch (err) {
      console.error('Erreur lors de l\'ajout aux favoris:', err);
      alert('Erreur lors de l\'ajout aux favoris');
    }
  };

  return (
    <div className="stock-market">
      <h2>Recherche de Marché</h2>
      
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Entrez un symbole boursier (ex: AAPL)"
        />
        <button onClick={searchStock} disabled={loading}>
          {loading ? 'Chargement...' : 'Rechercher'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {stockData && (
        <div className="stock-card">
          <h3>{stockData.symbol}</h3>
          <p>Prix: ${stockData.price.toFixed(2)}</p>
          <p className={stockData.change >= 0 ? 'positive' : 'negative'}>
            Variation: {stockData.change.toFixed(2)}%
          </p>
          <p>Volume: {stockData.volume.toLocaleString()}</p>
          <button onClick={addToFavorites}>Ajouter aux favoris</button>
          <StockChart symbol={stockData.symbol} />
        </div>
      )}
    </div>
  );

};


export default StockMarket;
