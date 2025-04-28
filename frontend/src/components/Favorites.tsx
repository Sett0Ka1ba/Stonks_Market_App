import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { StockData } from '../types';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [stocksData, setStocksData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/stocks/favorites');
        setFavorites(response.data.favorites);
      } catch (err) {
        setError('Erreur lors de la récupération des favoris');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchStocksData = async () => {
      if (favorites.length === 0) return;
      
      setLoading(true);
      const stocksPromises = favorites.map(symbol => 
        api.get(`/stocks/market-data/${symbol}`)
      );
      
      try {
        const responses = await Promise.all(stocksPromises);
        setStocksData(responses.map(response => response.data));
      } catch (err) {
        setError('Erreur lors de la récupération des données du marché');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocksData();
  }, [favorites]);

  const removeFavorite = async (symbol: string) => {
    try {
      await api.delete(`/stocks/favorites/${symbol}`);
      setFavorites(favorites.filter(fav => fav !== symbol));
      setStocksData(stocksData.filter(stock => stock.symbol !== symbol));
    } catch (err) {
      console.error('Erreur lors de la suppression du favori:', err);
      alert('Erreur lors de la suppression du favori');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="favorites">
      <h2>Mes Actions Favorites</h2>
      
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore d'actions favorites.</p>
      ) : (
        <div className="favorites-list">
          {stocksData.map(stock => (
            <div key={stock.symbol} className="stock-card">
              <h3>{stock.symbol}</h3>
              <p>Prix: ${stock.price.toFixed(2)}</p>
              <p className={stock.change >= 0 ? 'positive' : 'negative'}>
                Variation: {stock.change.toFixed(2)}%
              </p>
              <button onClick={() => removeFavorite(stock.symbol)}>
                Supprimer des favoris
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;